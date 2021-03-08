// Require keystone
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//crear servidor de express
const app = express();

// Configurar cors
app.use( cors() );

// express
app.use( express.json() );

// headers
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser({limit: '50mb'}));

// Conexión con base de datos
dbConnection();

app.use( express.static('public') )

// Rutas
app.use( '/api/user', require('./routes/users') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/link', require('./routes/links') );
app.use( '/api/section', require('./routes/section') );


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT } ....`);
});


