const {response} = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario.model');

const generarJWT = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req,res=response)=>{

    const {email,password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});
        //verificar email
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg:'Email o contraseña no válidos'
            })
        }
        //verificar password
        const validPassword= bcrypt.compareSync(password,usuarioDB.password);
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Email o contraseña no válidos'
            })
        }

        //generar token
        const token = await generarJWT(usuarioDB.id,usuarioDB.email,usuarioDB.role)

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok:false,
            msg:'Error inesperado, hable con el administrador'
        })
    }
}

const loginGoogle = async(req,res=response)=>{


    try {

        const {email,name,picture} = await googleVerify(req.body.token);
        const usuarioDB = await Usuario.findOne({email});

        let usuario;

        if (!usuarioDB){
            usuario=new Usuario({
                nombre:name,
                email:email,
                img:picture,
                password:'@@@',
                google:true
            })
        }else{
            usuario=usuarioDB;
            usuario.google=true;
        }
        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            email,name,picture,token
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok:false,
            msg:'token de Google no válido'
        });
    }

    res.status(400).json({
        ok:true,
        msg:'login google'
    })
}

module.exports={login,loginGoogle}