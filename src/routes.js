const router = require('express').Router()
const user = require('./services/user')

router.post('/kargotakip/user/login', user.login)
router.post('/kargotakip/user/refresh', user.refresh)
router.get('/kargotakip/user/get', user.getUserList)
router.post('/kargotakip/user/getTrendyolMessages', user.getTrendyolMessages)
router.post('/kargotakip/user/getTrendyolYemekMessages', user.getTrendyolYemekMessages)
router.post('/kargotakip/user/getHepsiburadaMessages', user.getHepsiburadaMessages)

module.exports = router;
