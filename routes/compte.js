const express = require('express');
const router = express.Router();
const controller = require("../controller/compte");


router.post("/login/web", controller.loginWeb)
/////////////////////////////::
router.post("/login/mobile",controller.loginMob) 
/////////////////////////::::::///////:
router.post("/ajouter/web",controller.ajouter)

module.exports = router ;