const userR = require('../repositories/user')
const fs = require('fs')
const path = require('path');
const process = require('process');
const axios = require('../configs/axios')
const {google} = require('googleapis');

exports.login = async (req, res) => {
    try {
        let { body } = req
        let responseObj = {}
        const params = {
            code: body.auth_code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'authorization_code'
        };
        const res1 = await axios.post('/token',params)

        const user = await userR.one({gmail_user_id: body.gmail_user_id})
        
        if(user) {
            const updatedUser = await userR.update({access_token: res1.data.access_token, refresh_token: res1.data.refresh_token}, {gmail_user_id: body.gmail_user_id})

            responseObj = {
                id: user.id,
                name: user.name,
                gmail: user.gmail,
                gmail_user_id: user.gmail_user_id,
                access_token: res1.data.access_token,
                refresh_token: res1.data.refresh_token
            }
        }
        else {
            const newUser = await userR.create({
                name: body.name,
                gmail: body.gmail,
                gmail_user_id: body.gmail_user_id,
                access_token: res1.data.access_token,
                refresh_token: res1.data.refresh_token
            })

            responseObj = {
                id: newUser.id,
                name: newUser.name,
                gmail: newUser.gmail,
                gmail_user_id: newUser.gmail_user_id,
                access_token: newUser.access_token,
                refresh_token: newUser.refresh_token
            }
        }
        if (res1.status === 200) {
            console.log(responseObj)
            res.status(200).send(responseObj)
        }
        else {
            throw 'TokenNotFound'
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}


exports.getTrendyolMessages = async (req, res) => {
    try {
        const { body } = req
        const user = await userR.one({id: body.id})
        console.log(user)
        const gmail = google.gmail({version: 'v1', 
            headers: {
                "Authorization": `Bearer ${user.access_token}`,
                "Content-Type": "application/json"
            },
        })
        let sortedMessageIds = []
        let kargoObject = []
        const regex = new RegExp(`(?<x>(?<=<td align="left" valign="top" style="font-family: Tahoma, Helvetica, Arial; font-size:14px; color:#000006; text-align:left; padding-top:5px; line-height:18px;">[\\s]+)[^\\s]+\\s?.*)[\\s+<br>]+(?<y>([^\\s]+\\s?.*))`,'gm')
        const res = await gmail.users.messages.list({
            userId: 'me',
            q: "from:info@email.trendyol.com", // kargo AROUND 25 takip
          });
          const messages = res.data.messages;
          if (!messages || messages.length === 0) {
            throw "No Trendyol Messages!"
          }

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
                    let i = kargoObject.length - 1
                    while (kargoObject[i].product !== item[2])
                        i--
                    
                    kargoObject[i] = {
                        status: 1, //kargoda
                        store: item[1],
                        product: item[2],
                        date: message.date
                    }
                }
            }
            else if (message.subject.includes("teslim ettik")) {
                let messageData = Buffer.from(message.data, 'base64')
                let item = null
                let oldIndex = kargoObject.length
                while (item = regex.exec(messageData)) {
                    let i = kargoObject.length - 1
                    while (i>=0 && kargoObject[i].product !== item[2])
                        i--
                    if (i === -1) {
                        kargoObject[oldIndex] = {
                            status: 2, //teslim
                            store: item[1],
                            product: item[2],
                            date: message.date
                        }
                    }
                    else {
                        kargoObject[i] = {
                            status: 2, //teslim
                            store: item[1],
                            product: item[2],
                            date: message.date
                        }
                    }
                    
                }
            }
          });
          console.log(kargoObject)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}

exports.getTrendyolYemekMessages = async (req, res) => {
    try {
        const { body } = req
        const user = await userR.one({id: body.id})
        console.log(user)
        const gmail = google.gmail({version: 'v1', 
            headers: {
                "Authorization": `Bearer ${user.access_token}`,
                "Content-Type": "application/json"
            },
        })
        let sortedMessageIds = []
        let kargoObject = []
        const regex = new RegExp(`(?<x>(?<=<td align="left" valign="top" style="font-family: Tahoma, Helvetica, Arial; font-size:14px; color:#000006; text-align:left; padding-top:5px; line-height:18px;">[\\s]+)[^\\s]+\\s?.*)\\s-`,'gm')
        const res = await gmail.users.messages.list({
            userId: 'me',
            q: "from:info@email.trendyol.com", // kargo AROUND 25 takip
          });
          const messages = res.data.messages;
          if (!messages || messages.length === 0) {
            throw "No Trendyol Yemek Messages!"
          }

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
                while (item = regex.exec(messageData)) {
                    kargoObject.push({
                        status: 0, //hazırlanıyor
                        store: null,
                        product: item[1],
                        date: message.date
                    })
                }
            }
            else if (message.subject.includes("Yemek Sipariş Teslimi")) {
                let messageData = Buffer.from(message.data, 'base64')
                let item = null
                let oldIndex = kargoObject.length
                while (item = regex.exec(messageData)) {
                    let i = kargoObject.length - 1
                    while (i>=0 && kargoObject[i].product !== item[1])
                        i--
                    if (i === -1) {
                        kargoObject[oldIndex] = {
                            status: 2, //teslim
                            store: null,
                            product: item[1],
                            date: message.date
                        }
                    }
                    else {
                        kargoObject[i] = {
                            status: 2, //teslim
                            store: null,
                            product: item[1],
                            date: message.date
                        }
                    }
                    
                }
            }
          });
          console.log(kargoObject)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}