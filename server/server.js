

//const { verify } = require("crypto");
const http = require("http");
const { url } = require("inspector");
const static = require('node-static');
const { getRequestData } = require('./utils/utils');
//let Todo = new (require('./controller/todos'))();
let LocationController = new (require('./controller/locations'))();
let authenticationController = new (require('./controller/authentication'))();

const port = 8000;
const host = 'localhost';
const GET = 'GET';
const PATCH = 'PATCH';
const POST = 'POST';
const DELETE = 'DELETE';
var fileServer = new static.Server('./../public');


/** To be fair this functions should be part of route processers */
const handleFilesRequest = (request, response) => {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}

const safeExec = async (fn, request, response) => {
    try {
        await fn(request, response);

    } catch (e) {
        console.log(e);
        switch (e.statusCode) // de forma : {statusCode : 400, message : "Bad request"}
        {
            case undefined: response.writeHead(499, { 'Content-Type': 'application/json' });
            default:
                response.writeHead(e.statusCode, { 'Content-Type': 'application/json' });
        }
        response.end(JSON.stringify({ message: e.message }))
    }
}

const authorizedSafeExec = async (fn, request, response) => {

    try {
        let userPayload = await authenticationController.verifyIfLoggedIn(request, response);
         console.log("user who called the server: ",userPayload);
         await fn(request, response, userPayload);
    }
    catch (e) {
    console.log("EXECERROR:" , e);
        switch (e.statusCode) // de forma : {statusCode : 400, message : "Bad request"}
        {
            case "undefined",undefined: response.writeHead(499, { 'Content-Type': 'application/json' });
            default:
                response.writeHead(e.statusCode, { 'Content-Type': 'application/json' });
        }
        response.end(JSON.stringify({ message: e.message }))
    }
}

const getAllLocationsWithinBounds = async (request, response) => {
    let geoLocation = await getRequestData(request);
    geoLocation = JSON.parse(geoLocation);

    const locations = await LocationController.getLocation(undefined, geoLocation);

    response.writeHead(200, '200', { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ locations: locations }));
}

// route listener; routs request to proper processor
async function requestListener(request, response) {

    //Act as Get but I'm lazy to parse URL params so we use POST to be able to have a body
    if(request.url.match(/\api\/locations\/upload/)&& request.method === POST)
        authorizedSafeExec(LocationController.uploadTest,request,response);
    else  if (request.url.match(/\api\/locations\/bound/) && request.method === POST) {
        safeExec(getAllLocationsWithinBounds, request, response);}
    else  if (request.url.match(/\api\/locations\/?$/) && request.method === GET)
        safeExec(LocationController.getAllLocations, request, response);
    else  if (request.url.match(/\api\/locations\/search\?(.)*/) && request.method === GET)
        safeExec(LocationController.getSuggestions,request,response);
    else  if (request.url.match(/\api\/locations\/filter\?(.)*/) && request.method === GET)
        safeExec(LocationController.getFilteredLocations, request, response);
    else if (request.url.match(/\api\/locations\/([0-9]+)/) && request.method === GET)
        safeExec(LocationController.getTheLocation, request, response);
    else if (request.url.match(/\api\/locations\/\?ids(.)*/) && request.method === GET)
        safeExec(LocationController.getMultipleLocations, request, response);
    else if (request.url.match(/\api\/locations\/add/) && request.method === POST)
        authorizedSafeExec(LocationController.addLocation, request, response);
    else if (request.url.match(/\api\/locations\/([0-9]+)/) && request.method === PATCH)
        authorizedSafeExec(LocationController.updateLocation, request, response);
    else if (request.url.match(/\api\/locations\/([0-9]+)/) && request.method === DELETE) {
        authorizedSafeExec(LocationController.deleteLocation, request, response);}

    else if (request.url.match(/\api\/admin\/users\/([0-9]+)/) && request.method === DELETE) {
        authorizedSafeExec(authenticationController.deleteUser, request, response);}

    else if (request.url.match(/\api\/locations\/myLocations/) && request.method === GET) {
        authorizedSafeExec(LocationController.getLocationsOwnedByUser, request, response);}
    else if (request.url.match(/\api\/login/) && request.method === POST) {
        safeExec(authenticationController.validateUser, request, response);}
 else if (request.url.match(/\api\/ping/) && request.method === GET) {
         safeExec(authenticationController.getPayloadFromCookie, request, response);}
    else if (request.url.match(/\api\/register/) && request.method === POST) {
        safeExec(authenticationController.addUser, request, response);
    }else if (request.url.match(/\api\/logout/) && request.method === POST) {
        safeExec(authenticationController.logout, request, response);
    } else if (request.url.match(/\api\/secret/) && request.method === GET) {
        authorizedSafeExec(LocationController.getAllLocations, request, response);
    } else if (request.method === GET) {
        handleFilesRequest(request, response);
    }  else {
        //500 page here!?!
        response.writeHead(500, "SERVER ERROR (WRITTEN IN BACKEND)", { 'Content-Type': 'application/json' });
        response.end("SERVER ERROR (WRITTEN IN BACKEND)");
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

























// ---------------------------    Should have been in that if-else madness from RequestListener -------------------------

      // else if (request.url.match(/\api\/todos\/([0-9]+)/) && request.method === GET) {
    //     safeExec(getTodo, request, response);
    // } else if (request.url.match(/\api\/todos\/([0-9]+)/) && request.method === PATCH) {
    //     safeExec(patchTodo, request, response);
    // } else if (request.url.match(/\api\/todos\/([0-9]+)/) && request.method === DELETE) {
    //     safeExec(deleteTodo, request, response);
    // } else if (request.url.includes('/api/todos') && request.method === POST) {
    //     safeExec(postTodo, request, response);
    // } else if (request.url.includes('/api/todos') && request.method === GET) {
    //     safeExec(getAllTodos, request, response);
    // }

// ----------------------------------------------------

// const getAllTodos = async (_, response) => {
//     const todos = await Todo.getTodos();

//     response.writeHead(200, '200', { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify(todos));
// }
// const getTodo = async (request, response) => {
//     const urlData = request.url.split('/');
//     const id = urlData[urlData.length - 1];
//     const todos = await Todo.getTodos(id);

//     response.writeHead(200, '200', { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify(todos));
// }
// const patchTodo = async (request, response) => {
//     const urlData = request.url.split('/');
//     const id = urlData[urlData.length - 1];

//     let todo_data = await getRequestData(request);

//     let message = await Todo.updateTodo(id, JSON.parse(todo_data));

//     response.writeHead(200, '200', { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify(message));
// }
// const postTodo = async (request, response) => {
//     let todo_data = await getRequestData(request);

//     let todo = await Todo.createTodo(JSON.parse(todo_data));

//     response.writeHead(200, '200', { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify(todo));
// }
// const deleteTodo = async (request, response) => {
//     const urlData = request.url.split('/');
//     const id = urlData[urlData.length - 1];

//     let message = await Todo.deleteTodo(id);

//     response.writeHead(200, '200', { 'Content-Type': 'application/json' });
//     response.end(JSON.stringify(message));
// }
