/*Servidor utilizando Express.js que implementa uma REST API basica*/

const express = require('express');
const app = express();

app.use(express.json());

//Lista inicial com os usuarios cadastrados
const users = [
	
	{id: 0, name: 'John'},
	{id: 1, name: 'Mary'},
	{id: 2, name: 'Bill'},

];

let nextid = 3

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
		//404 Content not found
		res.status(404).send('User not found');
	} else{
		res.send(user);
	}
});

//Rota para criar um usuario
app.post('/api/users', (req, res) => {
	if(!req.body.name) {
		// 400 Bad Request
		res.status(400).send('No name provided')
	}

	if(req.body.name.length < 3){
		res.status(400).send("Name should be at least 3 characters long")
	}
	
	const user = {
		id: users.length,
		name: req.body.name
	};
	users.push(user);
	res.send(user);
});

//Definindo a porta e abrindo o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port + '...'));
