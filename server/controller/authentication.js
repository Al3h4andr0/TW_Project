const allUsers = require('../data/users');
const locationService = new (require('../service/locationService'))();
const userService = new (require('../service/userService'))();
var jwt = require('jsonwebtoken');
const { getRequestData } = require('../utils/utils');
const returnError = (statusCode, message) => ({ statusCode: statusCode, message: message });


const SECRET = "TWProject"
class AuthenticationController {
    async addUser(request, response)
    {
        let requestBody = JSON.parse(await getRequestData(request));
        await userService.addUser(requestBody);
        response.writeHead(201, { 'Content-Type': 'application/json'});
        response.end("User created Successfully");
    }


    async validateUser(request, response) {
        let requestBody = JSON.parse(await getRequestData(request));

        let user = await getUserWithUsernameAndPassword(requestBody);
        let jwtToken = generateJwtToken({id: user.id,username: user.name});
      
        response.writeHead(201, { 'Content-Type': 'application/json',
        'Set-Cookie':'jwt=' + jwtToken + "; HttpOnly;"});
        response.end("Logged in Successfully");
    }
    
  async verifyIfLoggedIn(request,response){
    return new Promise((resolve, reject) => {
        let requestJwtFromHeader = getCookieFromHeader(request,"jwt");
   
        if(requestJwtFromHeader === null)
          return  reject({ statusCode: 401, message: `JWT not found. Unauthorized`});

         try{
            let payload = verifyJwtToken(requestJwtFromHeader);
        // if token is about to expire refresh it
            const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
            if (payload.exp - nowUnixSeconds < 30) {
                let newTokenPayload = generateJwtToken({ username : payload.username,id: payload.id});
                response.setHeader( 'Set-Cookie','jwt=' + newTokenPayload + "; HttpOnly;");
                console.log("Renewed JWT for ", newTokenPayload);
                return resolve(newTokenPayload);
            }
         //////////////////////////////////////

         resolve(payload);
            }
        catch(e)
        {
            console.log("CATCHED: ", e);
            reject(returnError(401,e.message));
        }
            
    }); 
    }

   async verifyIfAuthorizedToModifyLocation(id,userPayload)
    {
        const location = await locationService.getLocation(id);

        return new Promise((resolve,reject) => {
            let userId = userPayload.id;
            let userIsOwner = location.ownerId === userId;
            let userIsAdmin = (allUsers.find(user => user.id === userId)).admin === 1 ? true : false;
            
                if(userIsOwner || userIsAdmin)
                    resolve("Authorized");
                else
                    reject(returnError(401, "Not the owner of the apartment or admin. Unauthorized"));
        })
    }

    async getJWTPayload(request)
    {
        return new Promise((resolve,reject) => {
            let requestJwtFromHeader = getCookieFromHeader(request,"jwt");
            if(requestJwtFromHeader === null)
              return  reject({statusCode: 401, message: `No jwt Token. Unauthorized`});
            try{
                let payload = verifyJwtToken(requestJwtFromHeader);
                resolve(payload);
            }
            catch(e)
            {reject(returnError(401,"Token expired"));}
           
        })
    }

    logout(_,response)
    {   
      
        response.writeHead(201, { 'Content-Type': 'application/json',
        'Set-Cookie':'jwt=DELETED' + "; max-age=0"});
 
        response.end(JSON.stringify({message : "Logged out. See you soon!"}));
    }
}



getUserWithUsernameAndPassword = async (requestBody) => {
   return new Promise((resolve, reject) => {
        if (typeof requestBody.username === 'undefined' || typeof requestBody.password === 'undefined') reject(returnError(400, "Username/Password not found in request. Bad request."));
        let user = allUsers.find((user) => user.name === requestBody.username && user.password === requestBody.password);
        if (user) {
            resolve(user);
        } else {
            reject(returnError(400, "username/password invalid. Unauthorized."));
        }
    });
}


generateJwtToken = (payload) => {
    // to be rewritten to be actual JWT
    var jwtToken = jwt.sign(payload, SECRET, {expiresIn : '1min'});
    return jwtToken;
}

/**
 * Verifies the JWT token given from the client.Returns the payload, including expiring and issue date.
 */
verifyJwtToken = (jwtToken) => {
        var decoded = jwt.verify(jwtToken, SECRET);
        console.log("Payload: " , decoded)
        return decoded;
}


getCookieFromHeader = (request ,cookieName) => {

let cookieHeader = request.headers?.cookie;

let cookieMap = new Map();
if(!cookieHeader) return null;
    cookieHeader.split(";")
                .forEach( (instance) => {
                    let keyValue = instance.split(/=(.*)/s); //splits only by first occurence of =, the rest is captured inside (.)*
                    keyValue.pop(); // at the end it always has a null string idk why
                    if(keyValue.length != 2)
                        console.log(" ERROR: KEYVALUE HAS LENGTH != 2; Key-value list: " + keyValue);
                    cookieMap.set(keyValue[0],keyValue[1]);
                });
return cookieMap.get(cookieName);
}


module.exports = AuthenticationController;

