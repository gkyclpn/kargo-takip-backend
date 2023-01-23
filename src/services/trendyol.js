require('dotenv').config()
const userR = require('../repositories/user')
const kargoR = require('../repositories/kargo')
const axios = require('../configs/axios')
const {google} = require('googleapis');

exports.getTrendyolMessages = async (req, res) => {
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
        const regex = new RegExp(`(?<x>(?<=<td align="left" valign="top" style="font-family: Tahoma, Helvetica, Arial; font-size:14px; color:#000006; text-align:left; padding-top:5px; line-height:18px;">[\\s]+)[^\\s]+\\s?.*)[\\s+<br>]+(?<y>([^\\s]+\\s?.*))`,'gm')
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
                if (message.subject.includes("Siparişini aldık")) {
                    let messageData = Buffer.from(message.data, 'base64')
                    let item = null
                    while (item = regex.exec(messageData)) {
                        kargoObject.push({
                            status: 0, //hazırlanıyor
                            company: 'Trendyol',
                            store: item[1],
                            product: item[2],
                            date: message.date
                        })
                    }
                }
                else if (message.subject.includes("kargoya verdik") || message.subject.includes("Sipariş takibi")) {
                    let messageData = Buffer.from(message.data, 'base64')
                    let item = null
                    while (item = regex.exec(messageData)) {
                        kargoObject.push({
                            status: 1, //kargoda
                            company: 'Trendyol',
                            store: item[1],
                            product: item[2],
                            date: message.date
                        })
                    }
                }
                else if (message.subject.includes("teslim ettik")) {
                    let messageData = Buffer.from(message.data, 'base64')
                    let item = null
                    while (item = regex.exec(messageData)) {
                        kargoObject.push({
                            status: 2, //teslim
                            company: 'Trendyol',
                            store: item[1],
                            product: item[2],
                            date: message.date
                        })
                    }
                }
              });
              let oldTrendyolData = await kargoR.list({user_id: user.id, company: 'Trendyol'})
              let length = oldTrendyolData.length
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
                    return object.product !== obj.product && object.store !== obj.store
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