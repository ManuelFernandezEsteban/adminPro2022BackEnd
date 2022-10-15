const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospitales = require('../models/hospital.model');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path')
const fs =require('fs')


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposPermitidos.includes(tipo)) {
        req.json({
            ok: false,
            msg: 'No es un tipo permitido'
        })
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivo para subir'
        });
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    const extensionesValidas = ['bng', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        req.status(400).json({
            ok: false,
            msg: 'No es un tipo de archivo permitido'
        })
    }
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err)=> {
        if (err) {
            return res.status(500).json({
                ok:false,
                msg:err
            });
        }         

        actualizarImagen(tipo,id,nombreArchivo);
    
        res.json({
            ok: true,
            msg: path
        })
      });

}

const retornaImagen = (req,res=response)=>{

    const tipo = req.params.tipo;
    const image = req.params.image;
    const pathImagen = path.join(__dirname,`../uploads/${tipo}/${image}`);


    //imagen por defecto

    if ( fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
        const pathImagenPorDefecto = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImagenPorDefecto);
    }


    

}

module.exports = { fileUpload ,retornaImagen}