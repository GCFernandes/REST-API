const MongoClient = require("mongodb").MongoClient;
let connection;
let db;

async function intialize(){
    try{
        connection = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true })
        db = connection.db("all");
    } catch{
        return "Não foi possível inicializar a conexão com o servidor"
    }

}


async function getUser(id){
    obj = {"_id" : parseInt(id)};

    return await db.collection("users").findOne(obj);
}

async function deleteUser(id){
    obj = {"_id" : parseInt(id)};
    try{
    return await db.collection("users").deleteOne(obj);
    }catch{
        return "Não foi possível deletar o usuário";
    }
}

async function deleteUsers(){
    try{
    return await db.collection("users").deleteMany({});
    }catch{
        return "Não foi possíve deletar os usuários";
    }
}

async function getUsers(){
 
    return await db.collection("users").find({}).project({password:0, salt:0}).toArray();
}

async function insertUser(obj){
    
    obj._id = await db.collection("users").countDocuments();
    
    try{  
    return await db.collection("users").insertOne(obj);
    }catch{
        return "Não foi possível inserir o usuário";
    }
}

async function updateUser(id, obj){

    old_obj = {
        "_id": parseInt(id),
    }
    try{
        return db.collection("users").updateOne(old_obj, {$set: obj});
    }catch{
        return "Usuário não encontrado";
    }

}

module.exports = {
    intialize,
    insertUser,
    getUsers,
    getUser,
    deleteUsers,
    deleteUser,
    updateUser,
}