const express = require("express");
const { profileController } = require("../../controllers/index");
const auth = require("../../middleware/auth");
const router = express.Router();

router.route("/me").get(auth, profileController.getProfile);
router.route("/addItem").put(auth, profileController.addItem);
router.route("/deleteItem").put(auth, profileController.deleteItem);
router.route("/deleteBed").put(auth, profileController.deleteBed)

module.exports = router;
