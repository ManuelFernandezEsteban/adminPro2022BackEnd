/*
    Ruta: api/login
*/

const {login, loginGoogle}=require('../controllers/auth.controller');
const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');

const router = Router();

router.post('/',[
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','Debe proporcionar un email válido').isEmail(),
    validarCampos
],login);

router.post('/google',[
    check('token','El token de Google es obligatorio').not().isEmpty(),
    validarCampos
],loginGoogle);




module.exports = router;