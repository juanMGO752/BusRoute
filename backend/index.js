
// para las variables que se encuentren en el .env, sin el dotenv no se popdrian leer las variables
if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
};

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');


// Initializations
const app = express();

require('./database');


// settings

app.set('port',3000);

// Middlewares
app.use(morgan('dev'));

// codigo para las imagenes

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    } 
});
app.use(multer({storage}).single('image'));
// datos entregados por medio de formularios convertidos en json
app.use(express.urlencoded({extended: false}));
// json sin ningun formulario
app.use(express.json());
// modulo para la comunicacion de dos servidores, en este caso son el localhost:8080 y el localhost:3000
app.use(cors());



// Routes
app.use('/api/routes',require('./routes/routes.js')); //api creada con una url

// Static files
// en la carpeta "publi" es donde deben de ir todo lo que se puede mostar como el html, css, javascript o fotos
app.use(express.static(path.join(__dirname,'/public')));


// Start the server

app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});