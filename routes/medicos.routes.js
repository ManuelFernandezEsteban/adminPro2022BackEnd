/*
ruta
/api/medicos

*/

const {Router} = require('express');
const {getMedicos,actualizarMedico,crearMedico,borrarMedico} = require('../controllers/medicos.controller');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',getMedicos);
router.post('/', [
    validarJWT,
    check('nombre','El nombre del médico es requerido').not().isEmpty(),
    check('hospital','El hospital id debe ser válido').isMongoId(),
    validarCampos
] ,crearMedico);

router.put('/:id',[
    
],actualizarMedico);

router.delete('/:id',borrarMedico);


module.exports=router;