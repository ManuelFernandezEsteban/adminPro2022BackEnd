/*
ruta
/api/hospitales

*/

const {Router} = require('express');
const {getHospitales,crearHospital,actualizarHospital,borrarHospital} = require('../controllers/hospitales.controller');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',getHospitales);
router.post('/', [    
    validarJWT,
    check('nombre','El nombre del hospital es requerido').not().isEmpty(),
    validarCampos 
] ,crearHospital);

router.put('/:id',[
    
],actualizarHospital);

router.delete('/:id',borrarHospital);


module.exports=router;