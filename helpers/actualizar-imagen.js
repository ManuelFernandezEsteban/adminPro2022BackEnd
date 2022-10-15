const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospitales = require('../models/hospital.model');

const fs = require('fs');

const borrarImagen = (path) => {
    if (fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}


const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo ='';
    switch (tipo) {
        
        case 'medicos':
                const medico = await Medico.findById(id);
                if (!medico){
                    return false;
                }
                pathViejo = `./uploads/medicos/${medico.img}`;
                borrarImagen(pathViejo);
                medico.img=nombreArchivo;
                await medico.save()
                return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
                if (!usuario){
                    return false;
                }
                pathViejo = `./uploads/usuarios/${usuario.img}`;
                borrarImagen(pathViejo);
                usuario.img=nombreArchivo;
                await usuario.save()
                return true;

            break;
        case 'hospitales':
            const hospital = await Hospitales.findById(id);
                if (!hospital){
                    return false;
                }
                pathViejo = `./uploads/hospitales/${hospital.img}`;
                borrarImagen(pathViejo);
                hospital.img=nombreArchivo;
                await hospital.save()
                return true;

            break;

        default:
            break;
    }



}

module.exports = { actualizarImagen }