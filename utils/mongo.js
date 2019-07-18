const MongoClient = require("mongodb").MongoClient;
let connection;
let db;

async function intialize(){
    connection = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true })
    db = connection.db("all");
  //  db.createCollection("users");
}


async function getUser(id){
    obj = {"_id" : parseInt(id)};
    return await db.collection("users").findOne(obj);
}

async function deleteUser(id){
    obj = {"_id" : parseInt(id)};
    return await db.collection("users").deleteOne(obj);
}

async function deleteUsers(){
    return await db.collection("users").deleteMany({});
}

async function getUsers(){
    return await db.collection("users").find({}).toArray();
}

async function insertUser(obj){  
    await db.collection("users").insertOne(obj);
}

async function updateUser(id, obj){
    old_obj = {"_id" : parseInt(id)};
    await db.collection("users").updateOne(old_obj, {$set: obj});
    console.log(old_obj)
    console.log({$set: obj})
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