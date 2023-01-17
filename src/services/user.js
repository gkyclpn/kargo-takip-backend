const userR = require('../repositories/user')
const kargoR = require('../repositories/kargo')

const fs = require('fs')
const path = require('path');
const process = require('process');
const axios = require('../configs/axios')
const {google} = require('googleapis');

exports.login = async (req, res) => {
    try {
        const { body } = req
        
        let responseObj = {}
        const params = {
            code: body.auth_code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'authorization_code'
        };
        const res1 = await axios.post('/token',params)

        const user = await userR.one({gmail_user_id: body.gmail_user_id})
        
        if(user && res1.status === 200) {
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

exports.refresh = async (req, res) => {
    try {
        const { body } = req
        
        const user = await userR.one({id: body.id})

        const params = {
            refresh_token: user.refresh_token,
            access_type: 'offline',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'refresh_token'
        };
        const res1 = await axios.post('/token',params)
        console.log(res1.data)
        
        if(user && res1.status === 200) {
            const updatedUser = await userR.update({access_token: res1.data.access_token, refresh_token: res1.data.refresh_token}, {id: body.id})

            
        }
        else {
            if (!user) {
                throw 'User Not Found'
            }
            else {
                throw 'Doesnt Get Refresh Token'
            }
        }
        const responseObj = {
            id: user.id,
            name: user.name,
            gmail: user.gmail,
            gmail_user_id: user.gmail_user_id,
            access_token: res1.data.access_token,
            refresh_token: res1.data.refresh_token
        }
        console.log(responseObj)
        res.status(200).send(responseObj)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

exports.getUserList = async (req, res) => {
    try {
        const { body } = req
        let responseObj = []
        const users = await userR.list({isDelete: false})
        
        if (users) {
            users.map((user) => {
                responseObj.push({
                    id: user.id,
                    name: user.name,
                    gmail: user.gmail,
                    gmail_user_id: user.gmail_user_id,
                    access_token: user.data.access_token,
                    refresh_token: user.data.refresh_token
                })
            })
            console.log(responseObj)
            res.status(200).send(responseObj)
        }
        else {
            throw "No User Exist!"
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
        let responseObj = null
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

exports.getTrendyolYemekMessages = async (req, res) => {
    try {
        const { body } = req
        let responseObj = null
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
                    console.log(orderId ? orderId[0] : null)
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

exports.getHepsiburadaMessages = async (req, res) => {
    try {
        const { body } = req
        let responseObj = null
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