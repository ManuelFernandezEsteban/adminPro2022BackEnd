const {response} = require('express');
const Medico = require('../models/medico.model');
const Hospital = require ('../models/hospital.model');



const getMedicos = async (req,res=response)=>{

    const medicos = await Medico.find({},'nombre img usuario hospital')
        .populate('usuario','nombre img role')
        .populate('hospital','nombre img' );

    res.json({
        ok:true,
        medicos
    })
}



const crearMedico = async (req,res=response)=>{ 

    const uid = req.uid;
    //comprobar que el hospital existe
    if (req.body.hospital){
        const hospital = await Hospital.findById(req.body.hospital);    
        if (!hospital){        
            return res.status(400).json({ 
                ok:false,
                msg:'El hospital proporcionado no es válido'
            });
        
        }
    }

    const medico = new Medico(
        {
            usuario:uid,
            ...req.body
        }
    );    
    
    try {
        const medicoDB = await medico.save();
        res.json({
        ok:true,
        medicoDB
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}



const actualizarMedico = (req,res=response)=>{

    res.json({
        ok:true,
        msg:'actualizarMedico'
    })
}


const borrarMedico = (req,res=response)=>{

    res.json({
        ok:true,
        msg:'borrarMedico'
    })
}
module.exports={
    getMedicos,actualizarMedico,crearMedico,borrarMedico
}