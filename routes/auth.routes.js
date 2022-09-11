/*
    Ruta: api/login
*/

const {login}=require('../controllers/auth.controller');
const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');

const router = Router();

router.post('/',[
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','Debe proporcionar un email válido').isEmail(),
    validarCampos
],login);





module.exports = router;