const express = require('express');
const profileController = require('../../controllers/profile.controller')
const auth = require('../../middleware/auth')
const router = express.Router();

router.route('/me').get(auth, profileController.getProfile)
router.route('/addItem').put(auth, profileController.addItem);
router.route('/deleteItem').put(auth, profleController.deleteItem);

module.exports = router;