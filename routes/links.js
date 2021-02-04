/*
    Route: api/links
*/

const express = require('express');
const { getAllLinks, newLink } = require('../controllers/links');
const router = express.Router();




router.route('/').get(getAllLinks);
router.route('/').post(newLink);
  

module.exports = router;