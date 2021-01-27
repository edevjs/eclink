/*
    Route: api/links
*/

const express = require('express');
const { getAllLinks } = require('../controllers/links');
const router = express.Router();




router.route('/').post(getAllLinks);
  

module.exports = router;