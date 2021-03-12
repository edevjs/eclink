/**
  Route: ' /api/user '
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, getUsers, newUser, updateUser } = require('../controllers/user');
const { validateFields } = require('../middleware/validate-fields');
const { validateJWT } = require('../middleware/validate-jwt');


var router = Router();

router.get('/', validateJWT, getUser );

router.get('/all', validateJWT, getUsers );

// ruta con validadores (express-validator)
router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'Debe de introducir una password').not().isEmpty(),
  check('email', 'El campo email es obligatorio').isEmail(),
  validateFields
], newUser );

router.put('/:id', [
  check('password', 'Debe de introducir una password').not().isEmpty(),
  check('email', 'El campo email es obligatorio').isEmail(),
  validateFields
], updateUser );

module.exports = router;
