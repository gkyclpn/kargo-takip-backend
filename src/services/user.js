require('dotenv').config()
const userR = require('../repositories/user')
const kargoR = require('../repositories/kargo')
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
                    access_token: user.access_token,
                    refresh_token: user.refresh_token
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

exports.getKargosList = async (req, res) => {
    try {
        const { body } = req
        let kargosArray = []
        const kargos = await kargoR.list({user_id: body.id})
        
        if (kargos) {
            kargos.map((kargo) => {
                kargosArray.push({
                    status: kargo.status,
                    company: kargo.company,
                    store: kargo.store,
                    product: kargo.product,
                    date: kargo.order_date
                })
            })
            const responseObj = {
                kargos: kargosArray
            }
            console.log(responseObj)
            res.status(200).send(responseObj)
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}