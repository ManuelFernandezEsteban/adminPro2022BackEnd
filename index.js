
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./databse/config');


//crear el servidor express

//mongodb+srv://<username>:<password>@mycluster.ipen2.mongodb.net/test
//mean_user
//n99Zo4iEKVZxZcko

const app = express();

//configurar cors

app.use(cors());

//base datos
dbConnection();

//rutas
app.get('/',(req,res)=>{

    res.json({
        ok:true,
        msg:"Hola mundo"
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});

