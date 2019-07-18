/*Servidor utilizando Express.js que implementa uma REST API basica*/

const mongo = require('./utils/mongo');

const express = require('express');
const app = express();
let idCount = 0;

mongo.intialize();

app.use(express.json());

//Lista inicial com os usuarios cadastrados
const users = [
	
	{id: 0, name: 'John'},
	{id: 1, name: 'Mary'},
	{id: 2, name: 'Bill'},
	{id: 3, name: 'Chris'},
	{id: 4, name: 'Michael'},

];


//Rota da pagina inicial 
app.get('/', (req, res) => {
	res.send('Welcome to our homepage!');
});

//Rota para recuperar todos os usuarios
app.get('/api/users', async (req, res) => {
	
	let users = await mongo.getUsers()
	
	res.send(users);
});

//Rota pra recuperar um usuario especifico
app.get('/api/users/:id', async(req, res) => {

	user = await mongo.getUser(req.params.id);
	
	res.send(user);
});

//Rota para criar um usuario

app.post('/api/users', (req, res) => {
	if(!req.body.name) 
		// 400 Bad Request
		return res.status(400).send('No name provided')

	if(req.body.name.length < 3)
		return res.status(400).send("Name should be at least 3 characters long")
	
	const user = {
		_id: idCount++,
		name: req.body.name
	};
	mongo.insertUser(user);
	res.send(user);
});

//Rota para atualizar um usuario
app.put('/api/users/:id', async (req, res) => {
	
	const obj = {
		_id : parseInt(req.params.id),
		name : req.body.name,
	}

	user = await mongo.updateUser(req.params.id, obj);
	res.send(user);
});

//Rota para deletar um usuario
app.delete('/api/users/:id', async (req, res) => {
	
	user = await mongo.deleteUser(req.params.id);
	res.send(user);
	

});

//Rota para deletar todos os usuarios
app.delete('/api/users', async (req, res) => {
	
	let users = await mongo.deleteUsers();
	
	res.send(users);
});

//Definindo a porta e abrindo o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port + '...'));
