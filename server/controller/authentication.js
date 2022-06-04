const allUsers = require('../data/users');
var jwt = require('jsonwebtoken');
const { getRequestData } = require('../utils/utils');
const notFound = (statusCode, message) => ({ statusCode: statusCode, message: message });


const SECRET = "TWProject"
class AuthenticationController {
    async validateUser(request, response) {
        let requestBody = JSON.parse(await getRequestData(request));

        let user = await getUserWithUsernameAndPassword(requestBody);
        let jwtToken = generateJwtToken({username: user.name});
      
        response.writeHead(200, '200', { 'Content-Type': 'application/json',
        'Set-Cookie':'jwt=' + jwtToken });
        response.end("Logged in Successfully");
    }
    
   verifyIfAuthorized(request,response){
    return new Promise((resolve, reject) => {
        let requestJwtFromHeader = getCookieFromHeader(request,"jwt");
       
        if(requestJwtFromHeader === null)
          return  reject({ message: `JWT not found. Unauthorized`});

         try{
            let payload = verifyJwtToken(requestJwtFromHeader);
        // if token is about to expire refresh it
            const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
            if (payload.exp - nowUnixSeconds < 30) {
                
                response.setHeader( 'Set-Cookie','jwt=' + generateJwtToken({ username : payload.username}));
            }
            //////////////////////////////////////

         resolve("Authorized");
        }
        catch(e)
        {
            console.log(e);
            reject({message : e.message});
        }
            
    }); 
    }
}



getUserWithUsernameAndPassword = async (requestBody) => {
   return new Promise((resolve, reject) => {
        if (typeof requestBody.username === 'undefined' || typeof requestBody.password === 'undefined') reject(notFound(400, "Username/Password not found in request. Bad request."));
        let user = allUsers.find((user) => user.name === requestBody.username && user.password === requestBody.password);
        if (user) {
            resolve(user);
        } else {
            reject(notFound(401, "username/password invalid. Unauthorized."));
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

