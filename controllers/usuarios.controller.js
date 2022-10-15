const Usuario = require('../models/usuario.model');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const generarJWT = require('../helpers/jwt');

const getUsuarios = async (req, res=response) => {

    const desde = Number (req.query.desde) || 0;

    const [usuarios,total] = await Promise.all([
        Usuario.find({}, 'nombre apellidos email google role img')
        .skip(desde)                  
        .limit(5),
        
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    })
}

const crearUsuario = async (req, res = response) => {

    const { email, password} = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe en la base de datos'    
            });
        }

        const usuario = new Usuario(req.body);
        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);
        await usuario.save();

        const token = await generarJWT(usuario.id,usuario.email,usuario.role)

        res.json({
            ok: true,
            msg: 'usuario creado',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'

        });
    }

}

const actualizarUsuario =  async (req, res = response) =>{
//TODO Validar token y comprobar role
    const uid = req.params.id;   

    try {       

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb){
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe en la BD por ese id'    
            });
        }
        const {password,google,email, ...campos} = req.body;

        if (usuarioDb.email!=email){
            const existeEmail = await Usuario.findOne({email:email});            
            if (existeEmail){
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'    
                });
            }

        }
        //Actualizar
        campos.email=email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true});

        res.json({
            ok: true,
            usuario:usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'

        });
    }
}

const borrarUsuario =  async (req, res = response) =>{
    //TODO Validar token y comprobar role
        const uid = req.params.id;   
    
        try {       
    
            const usuarioDb = await Usuario.findById(uid);
    
            if (!usuarioDb){
                return res.status(404).json({
                    ok: false,
                    msg: 'El usuario no existe en la BD por ese id'    
                });
            }
            
            const usuarioEliminado = await Usuario.findByIdAndDelete(uid,{new:true});
    
            res.json({
                ok: true,
                usuario:usuarioEliminado
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesperado, revisar logs'
    
            });
        }
    }

module.exports = {
    getUsuarios, crearUsuario,actualizarUsuario,borrarUsuario
}