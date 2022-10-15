const {response} = require('express');
const Hospital = require('../models/hospital.model');



const getHospitales = async (req,res=response)=>{

    const hospitales = await Hospital.find({},'nombre img usuario')
        .populate('usuario','nombre img role')

    res.json({
        ok:true,
        hospitales
    })
}



const crearHospital =async (req,res=response)=>{
    
    const uid = req.uid;
    const hospital = new Hospital(
        {
            usuario:uid,
            ...req.body
        }
    );    
    
    try {
        const hospitalBD = await hospital.save();
        res.json({
        ok:true,
        hospitalBD
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }

    
}



const actualizarHospital = (req,res=response)=>{

    res.json({
        ok:true,
        msg:'actualizarHospital'
    })
}


const borrarHospital = (req,res=response)=>{

    res.json({
        ok:true,
        msg:'borrarHospital'
    })
}
module.exports={
    getHospitales,actualizarHospital,crearHospital,borrarHospital
}