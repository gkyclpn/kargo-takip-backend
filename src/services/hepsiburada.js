require('dotenv').config()
const userR = require('../repositories/user')
const kargoR = require('../repositories/kargo')
const axios = require('../configs/axios')
const {google} = require('googleapis');

exports.getHepsiburadaMessages = async (req, res) => {
    try {
        const { body } = req
        let responseObj = null
        const user = await userR.one({id: body.id})
        const gmail = google.gmail({version: 'v1', 
            headers: {
                "Authorization": `Bearer ${user.access_token}`,
                "Content-Type": "application/json"
            },
        })
        let sortedMessageIds = []
        let kargoObject = []
        const res1 = await gmail.users.messages.list({
            userId: 'me',
            q: "from:merhaba@newsletter.hepsiburada.com", // kargo AROUND 25 takip
          });
          const messages = res1.data.messages;
          if (!messages || messages.length === 0) {
            responseObj = {
                kargos: []
              }
          }
          else {
            await Promise.all(messages.map(async (message)  => {
                let resMessageId = await gmail.users.messages.get({
                  userId: 'me',
                  id: message.id
                });
                
                let subject = null
                let date = null
                resMessageId.data.payload.headers.forEach( (header) => {
                    if(header.name === "Subject") {
                    subject = header.value
                    }
    
                    if(header.name === "Date") {
                        date = header.value
                    }
                })
                let data = resMessageId.data.payload.parts[1].body.data
                sortedMessageIds.push({
                    data: data,
                    date: date,
                    subject: subject
                })
                
              }));
    
              sortedMessageIds.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
              });
            
              sortedMessageIds.map((message) => {
                if (message.subject.includes("Siparişinizi aldık")) {
                    let regex = new RegExp(`(?<product>(?<=(?<=(?<=<td style="font-family:sans-serif; font-size:12px; font-weight:bold; line-height:18px; color:#484848; padding-top:4px">[\\s]+).*(?<store>(?<=magaza=)[^"]+)")[^>]+>)[^\\s].*)`,'gm')
                    let orderIdRegex = new RegExp(`(?<id>(?<=<div style="padding-bottom:25px"><a href="https:\/\/www\.hepsiburada\.com\/siparislerim\/detay\/)[^?]+)`,'gm')
                    let messageData = Buffer.from(message.data, 'base64')
                    let orderId = orderIdRegex.exec(messageData)
                    let item = null
                    while (item = regex.exec(messageData)) {
                        kargoObject.push({
                            orderId: orderId[1],
                            status: 0, //hazırlanıyor
                            company: 'Hepsiburada',
                            store: item[2],
                            product: item[0],
                            date: message.date
                        })
                    }
                }
                else if (message.subject.includes("Paketiniz kargoya verildi")) {
                    let messageData = Buffer.from(message.data, 'base64')
                    let orderIdRegex = new RegExp(`(?<id>(?<=href="https:\/\/www\.hepsiburada\.com\/siparislerim\/detay\/)[^\/]+)`,'gm')
                    let orderId = orderIdRegex.exec(messageData)
                    let length = kargoObject.length
                    for (let i = 0; i < length; i++) {
                        if (kargoObject[i].orderId === orderId[1] && kargoObject[i].status === 0) {
                            kargoObject.push({
                                orderId: orderId[1],
                                status: 1, //kargoda
                                company: 'Hepsiburada',
                                store: kargoObject[i].store,
                                product: kargoObject[i].product,
                                date: message.date
                            })
                        }
                    }
                }
                else if (message.subject.includes("Şimdi değerlendirme zamanı")) {
                    let messageData = Buffer.from(message.data, 'base64')
                    let orderIdRegex = new RegExp(`(?<id>(?<=<b>Sipariş No :<\/b> <span style="font-family:Arial,Helvetica,sans-serif">)[^<]+)`,'gm')
                    let orderId = orderIdRegex.exec(messageData)
                    let length = kargoObject.length
                    for (let i = 0; i < length; i++) {
                        if (kargoObject[i].orderId === orderId[1] && kargoObject[i].status === 0) {
                            kargoObject.push({
                                orderId: orderId[1],
                                status: 2, //teslim
                                company: 'Hepsiburada',
                                store: kargoObject[i].store,
                                product: kargoObject[i].product,
                                date: message.date
                            })
                        }
                    }
                }
              });
              let oldHepsiburadaData = await kargoR.list({user_id: user.id, company: 'Hepsiburada'})
              let length = oldHepsiburadaData.length
              await Promise.all(kargoObject.map(async (kargo,i) => {
                let createdKargo = null
                if (i >= length) {
                    createdKargo = await kargoR.create({
                        user_id: user.id,
                        status: kargo.status,
                        company: kargo.company,
                        store: kargo.store,
                        product: kargo.product,
                        order_date: kargo.date
                    })
                }
              }))
              let tempArray = kargoObject
              let lastStatusOfKargos = []
              while (tempArray.length !== 0) {
                let i = tempArray.length - 1
                let obj = tempArray[i]
                lastStatusOfKargos.push(obj)
                tempArray = tempArray.filter((object) => {
                    return object.orderId !== obj.orderId
                })
              }
              responseObj = {
                kargos: lastStatusOfKargos
              }
          }
          
          res.status(200).send(responseObj)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}