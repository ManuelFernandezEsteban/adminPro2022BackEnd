const { response } = require("express");
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospitales = require('../models/hospital.model');

const getTotal = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({
            nombre: regexp
        }),
        Medico.find({
            nombre: regexp
        }),
        Hospitales.find({
            nombre: regexp
        })
    ])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales

    })
}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regexp }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospitales.find({ nombre: regexp }).populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({
                nombre: regexp
            });
            break;
        default:
            return res.status(400).json({
                ok: false,
                error: 'La tabla debe ser usuarios, médicos o hospitales'
            });


    }
    res.json({
        ok: true,
        data
    })
}

module.exports = { getTotal, getDocumentosColeccion }