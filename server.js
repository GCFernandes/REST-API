/*Servidor utilizando Express.js que implementa uma REST API basica*/

const express = require('express');
const app = express();

//Lista inicial com os usuarios cadastrados
const users = [
	
	{id: 0, name: 'John'},
	{id: 1, name: 'Mary'},
	{id: 2, name: 'Bill'},

];

//Rota da pagina inicial 
app.get('/', (req, res) => {
	res.send('Welcome to our homepage!');
});

//Rota para recuperar todos os usuarios
app.get('/api/users', (req, res) => {
	res.send(users);
});

//Rota pra recuperar um usuario especifico
app.get('/api/users/:id', (req, res) => {
	const user = users.find(c => c.id === parseInt(req.params.id));
	if (!user){
		res.status(404).send('User not found');
	} else{
		res.send(user);
	}
});

//Definindo a porta e abrindo o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port + '...'));
