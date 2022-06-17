const allUsers = require("../data/users")



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
            resolve("created");
        });
    }

    
}

module.exports = UserService;