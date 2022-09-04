const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () =>{
    
    try{
        await mongoose.connect(process.env.DB_CNN);
    }
  
    catch(error){
        console.log(error);
        throw new Error('Error al iniciar BD');
    }

    console.log('DB online')
}

module.exports={
    dbConnection
}