
const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const { body } = require('express-validator');
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded( {extended: false}));
app.use(bodyParser.json());
const uri = "mongodb+srv://stefi.andrewartha:986565@cluster0.l4weh.mongodb.net/paciente?retryWrites=true&w=majority";

console.log(uri) 

mongoose.connect(uri,
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }
)
    .then( () => console.log("La bade de datos se a conectado"))
    .catch( e => console.log(e))

    app.use(express.static('views/template'))


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const authRoutes = require('./router/auth');

app.use('/api/user', authRoutes);
app.use('/pacientes', require('./router/pacientesRouter'));
app.use('/', require('./router/rutasWeb'))
app.use('/user', require('./router/auth'))

app.get('/', (request, response) =>{
    response.json({
        estado: true,
        mensaje: 'Funciona'
    })
});

const PORT = 8080;
app.listen(PORT, () =>{
    console.log("Servidor funcional enhttp://localhost:${PORT}.")
})