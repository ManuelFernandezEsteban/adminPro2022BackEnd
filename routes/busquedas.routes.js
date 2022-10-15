
/*
Ruta: api/todo/

*/

const {Router} = require('express');
const {getTotal, getDocumentosColeccion} = require('../controllers/busquedas.controllers')
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/:busqueda',validarJWT,getTotal);

router.get('/coleccion/:tabla/:busqueda',validarJWT,getDocumentosColeccion);


module.exports=router;