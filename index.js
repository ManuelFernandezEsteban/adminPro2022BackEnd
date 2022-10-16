
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');


//crear el servidor express

//mongodb+srv://<username>:<password>@mycluster.ipen2.mongodb.net/test
//mean_user
//n99Zo4iEKVZxZcko

const app = express();

//configurar cors

app.use(cors());

//carpeta public

app.use(express.static('public'))

//lectura y parseo JSON
app.use(express.json());

//base datos
dbConnection();

//rutas

app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/hospitales',require('./routes/hospitales.routes'));
app.use('/api/medicos',require('./routes/medicos.routes'));
app.use('/api/login',require('./routes/auth.routes'));
app.use('/api/todo',require('./routes/busquedas.routes'));
app.use('/api/upload',require('./routes/uploads.routes'));


app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`);
});

