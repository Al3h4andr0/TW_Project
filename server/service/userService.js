const readJson = require('../utils/jsonReader');
const writeJson = require('../utils/jsonWriter');

const USERS_PATH = "./data/users.json";
var allUsers = [];
readJson(USERS_PATH,(err, data) =>{
    if(err)
        console.log(err);
    else
        {
            allUsers = JSON.parse(data);
        }
})



class UserService{
    async addUser(user)
    {
        console.log("PAYLOAD", user.username)
        return new Promise((resolve, reject) => {


            if(allUsers.find(theUser=> theUser.name === user.username) !== undefined)
               return reject({statusCode: 409,message: "User already exists!"});


            let newUser = {
                name: user.username,
                password: user.password,
                id: allUsers[allUsers.length - 1].id + 1
            }
         
            allUsers.push(newUser);
            writeJson(USERS_PATH, allUsers, () => {
                resolve("created");
            })
          
        });
    }

    
}

module.exports = UserService;