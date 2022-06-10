const express = require('express');
const validate = require('../../middlewares/validate');
const searchController = require('../../controllers/search.controller');
const searchValidation = require('../../validations/search.validation');
const router = express.Router();

router.route('/searchItem').post(validate(searchValidation.searchItem), searchController.searchItem);
router.route('/getList').post(validate(searchValidation.addMedicine), searchController.itemList);
router.route('/getAllMedicine').get(searchController.getAllMedicine);

module.exports = router;