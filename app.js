// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


// Simulate config options from your production environment by
// customising the .env file in your project's root folder.

// Require keystone
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//crear servidor de express
const app = express();

// Configurar cors
app.use( cors() );

app.use( express.json() );

// Conexión con base de datos
dbConnection();

// Rutas
app.use( '/api/user', require('./routes/users') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/link', require('./routes/links') );

app.listen( process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + 3000);
});
// express.import('models')


// express.set('routes', require('./routes'))

// require('./routes/api/mongo-client')
