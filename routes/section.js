/*
    Route: api/links
*/
const { Router } = require('express');
const { getAllSections, newSection } = require('../controllers/section');
const { validateJWT } = require('../middleware/validate-jwt');


var router = Router();


router.get('/', validateJWT, getAllSections);
router.post('/', validateJWT, newSection);
  

module.exports = router; 