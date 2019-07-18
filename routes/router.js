var express = require("express");
var router = express.Router();
const mongo = require('../utils/mongo');
const bcrypt = require('../utils/bcrypt');

//Rota da pagina inicial 
router.get('/', (req, res) => {
	res.send('Welcome to our homepage!');
});

//Rota para criar um usuario
router.post('/api/users', async (req, res) => {

	let s, pass;


	try {s = await bcrypt.salt();}
	catch{"Salt invalido"}
	
	try{pass = await bcrypt.encrypt(req.body.password, s);}
	catch{"Não foi prossivel fazer a criptografia"}

	let user = {
		_id: 0,
		name:req.body.name,
		password: pass,
		salt: s,
	};
	
	try{
		await mongo.insertUser(user);
	}catch{

	}
	res.status(201).send();
});

//Rota para deletar todos os usuarios
router.delete('/api/users', async (req, res) => {
	
	try{
        users = await mongo.deleteUsers();
        res.send(users);
	}catch{
        res.status(404).send();
	}


});

router.get('/api/users', async (req, res) => {

	try{
		res.send(await mongo.getUsers());
	}catch{
		res.status(404).send();
	}

});

//Rota para atualizar um usuario
router.put('/api/users/:id', async (req, res) => {
	
	const obj = {
		_id : parseInt(req.params.id),
		name : req.body.name,
	}

	try{
	user = await mongo.updateUser(req.params.id, obj);
	}catch{
	}

	res.status(200).send();
});

//Rota para deletar um usuario
router.delete('/api/users/:id', async (req, res) => {
	
	try{
	user = await mongo.deleteUser(req.params.id);
	res.send(user);
	}catch{
		res.send("Não foi possivel deletar o usuario")
	}
	

});

//Rota pra recuperar um usuario especifico
router.get('/api/users/:id', async(req, res) => {


	let user;
	try{
		user = await mongo.getUser(req.params.id);
		res.send(user);
	}catch{

	}

});

//Rota para validar uma combinação de id e senha
router.post('/api/users/login', async (req, res) => {

	let user;

	try{
		user = await mongo.getUser(req.body.id);
	}
	catch{
		return res.status(404).send("User not found");
	}

	if(user != null && await bcrypt.check(req.body.password, user.password, user.salt)){
		res.send("Login successfull");
	
	}else{ 
		res.send("Invalid login or password");
	}
});


module.exports = router;