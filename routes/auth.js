
/**
  Route: ' /api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();

router.post('/',
    [
      check('email', 'El campo email es obligatorio').isEmail(),
      check('password', 'Debe de introducir una password').not().isEmpty(),
      validateFields
    ],
    login
);

router.post( '/google', 
    [
      check('token', 'El token de Google es obligatorio').not().isEmpty(),
      validateFields
    ],
    googleSignin
);




module.exports = router;