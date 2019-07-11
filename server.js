/*Servidor utilizando Express.js que implementa uma REST API basica*/

const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('Welcome to our homepage!');
});

app.get('/api/users', (req, res) => {
	res.send(['John', 'Mary', 'Bill']);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port + '...'));
