/*Servidor utilizando Express.js que implementa uma REST API basica*/
const mongo = require('./utils/mongo');
var bodyParser = require('body-parser');
const router = require('./routes/router');

const express = require('express');
const app = express();

mongo.intialize();

app.use(bodyParser.json());
app.use('/', router);


//Definindo a porta e abrindo o servidor
let port = process.env.PORT || 3142;
app.listen(port, () => console.log('Listening on port ' + port + '...'));
