const router = require('express').Router()
const user = require('./services/user')
const trendyol = require('./services/trendyol')
const trendyolYemek = require('./services/trendyolYemek')
const hepsiburada = require('./services/hepsiburada')

router.post('/kargotakip/user/login', user.login)
router.post('/kargotakip/user/refresh', user.refresh)
router.get('/kargotakip/user/get', user.getUserList)
router.post('/kargotakip/user/getKargos', user.getKargosList)
router.post('/kargotakip/user/getTrendyolMessages', trendyol.getTrendyolMessages)
router.post('/kargotakip/user/getTrendyolYemekMessages', trendyolYemek.getTrendyolYemekMessages)
router.post('/kargotakip/user/getHepsiburadaMessages', hepsiburada.getHepsiburadaMessages)

module.exports = router;
