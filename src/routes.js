const router = require('express').Router()
const user = require('./services/user')

router.post('/kargotakip/user/login', user.login)
router.post('/kargotakip/user/getTrendyolMessages', user.getTrendyolMessages)
router.post('/kargotakip/user/getTrendyolYemekMessages', user.getTrendyolYemekMessages)

module.exports = router;
