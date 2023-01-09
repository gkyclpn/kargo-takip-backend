const express = require('express')()

express.use(require('cors')({ origin: '*' }))

const { json } = require('body-parser')
express.use(json({ limit: '100kb' }))

express.use(require('./routes'))

express.listen(5000, () => {
    console.log('KargoTakip Backend Run!')
})