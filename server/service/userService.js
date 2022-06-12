const allUsers = require("../data/users")



class UserService{
    async addUser(user)
    {
        return new Promise((resolve, _) => {
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