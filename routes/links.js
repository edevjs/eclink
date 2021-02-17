/*
    Route: api/links
*/
const { Router } = require('express');
const { getAllLinks, newLink } = require('../controllers/links');
const { validateJWT } = require('../middleware/validate-jwt');


var router = Router();


router.get('/', validateJWT, getAllLinks);
router.post('/', validateJWT, newLink);
  

module.exports = router;