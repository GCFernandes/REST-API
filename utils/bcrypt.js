const bcrypt = require('bcrypt');

async function salt(){
    return bcrypt.genSaltSync(10);

}

async function encrypt(password, salt){

    return bcrypt.hashSync(password, salt);
}

async function check(plain, encrypted, salt){
    console.log(plain);
    console.log(encrypted);
    console.log(bcrypt.hashSync(plain, salt));

    return(encrypted == bcrypt.hashSync(plain, salt));
}

module.exports = {
    encrypt,
    check,
    salt,
}