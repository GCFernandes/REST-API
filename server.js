/*Servidor utilizando Express.js que implementa uma REST API basica*/
const mongo = require('./utils/mongo');
const bcrypt = require('./utils/bcrypt');
const router = require('./routes/router');

const express = require('express');
const app = express();
let idCount = 0;

mongo.intialize();

app.use('/', router);
app.use('/api/users/', router);
app.use('/api/users/:id', router);
app.use('/api/users/login', router);


//Definindo a porta e abrindo o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port + '...'));
