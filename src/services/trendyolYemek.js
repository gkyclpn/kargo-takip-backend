require('dotenv').config()
const userR = require('../repositories/user')
const kargoR = require('../repositories/kargo')
const axios = require('../configs/axios')
const {google} = require('googleapis');

exports.getTrendyolYemekMessages = async (req, res) => {
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
        const regex = new RegExp(`(?<x>(?<=<td align="left" valign="top" style="font-family: Tahoma, Helvetica, Arial; font-size:14px; color:#000006; text-align:left; padding-top:5px; line-height:18px;">[\\s]+)[^\\s]+\\s?.*)\\s-`,'gm')
        const idRegexSiparis = new RegExp(`(?<id>(?<=Merhaba,<br \/><br \/>[\\s]+<strong>)[^<]+)`,'gm')
        const idRegexTeslim = new RegExp(`(?<id>(?<=Merhaba,<br><br>[\\s]+<strong>)[^<]+)`,'gm')
        const res1 = await gmail.users.messages.list({
            userId: 'me',
            q: "from:info@email.trendyol.com", // kargo AROUND 25 takip
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
                let data = resMessageId.data.payload.body.data
                sortedMessageIds.push({
                    data: data,
                    date: date,
                    subject: subject
                })
                
              }));
    
              sortedMessageIds.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
              });
            
              sortedMessageIds.map((message)  => {
                if (message.subject.includes("Yemek Siparişini Aldık")) {
                    let messageData = Buffer.from(message.data, 'base64')
                    let item = null
                    let orderDate = new Date(message.date)
                    let now = new Date()
                    let orderId = null
                    if (now.getFullYear() > orderDate.getFullYear() || now.getMonth() > orderDate.getMonth())
                        orderId = null
                    else
                        orderId = idRegexSiparis.exec(messageData)
                    
                    while (item = regex.exec(messageData)) {
                        kargoObject.push({
                            orderId: orderId ? orderId[0] : orderId,
                            status: 0, //hazırlanıyor
                            company: 'Trendyol Yemek',
                            store: null,
                            product: item[1],
                            date: message.date
                        })
                    }
                    
                }
                else if (message.subject.includes("Yemek Sipariş Teslimi")) {
                    let messageData = Buffer.from(message.data, 'base64')
                    let item = null
                    let orderDate = new Date(message.date)
                    let now = new Date()
                    let orderId = null
                    if (now.getFullYear() > orderDate.getFullYear() || now.getMonth() > orderDate.getMonth())
                        orderId = null
                    else
                        orderId = idRegexTeslim.exec(messageData)
                    while (item = regex.exec(messageData)) {
                        kargoObject.push({
                            orderId: orderId ? orderId[0] : orderId,
                            status: 2, //teslim
                            company: 'Trendyol Yemek',
                            store: null,
                            product: item[1],
                            date: message.date
                        })
                    }
                }
              });
              let oldTrendyolYemekData = await kargoR.list({user_id: user.id, company: 'Trendyol Yemek'})
              let length = oldTrendyolYemekData.length
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
              console.log(kargoObject)
              let tempArray = kargoObject
              let lastStatusOfKargos = []
              tempArray = tempArray.filter((object) => {
                return object.orderId !== null
              })
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