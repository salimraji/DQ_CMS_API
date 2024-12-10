const express = require('express')
const router = express.Router();
const mappUserController = require('../controllers/mappUsetController')

router.post('/linkToMobile', mappUserController.linkToMobile)
router.post('/setUserInfo', mappUserController.setUserInfo)

module.exports = router;