const { verify } = require("crypto");
const http = require("http");
const { url } = require("inspector");
const static = require('node-static');
const { getRequestData} = require('./utils/utils');
/** We want the this as a single tone as it is kinda the database at the moment; can't enforce the pattern in js form one i know so we work with what we have*/
let Todo = new (require('./controller/todos'))();
let Location = new (require('./controller/locations'))();
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
        switch(e.statusCode)
        {
            case undefined:
                response.writeHead(499, {'Content-Type': 'application/json'});
                break;
            case 401:
                response.writeHead(401,{'Content-Type': 'application/json'});
            default:
                response.writeHead(404, {'Content-Type': 'application/json'});
        }
        response.writeHead(404, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({ message: e.message}))
    }
}

const authorizedSafeExec = async (fn, request, response) => {

    try{
        await authenticationController.verifyIfAuthorized(request,response);
        safeExec(fn,request,response);
    }
    catch (e)
    {
        console.log(e);
        response.writeHead(401, "Unauthorized...", {'Content-Type': 'application/json'});
        response.end(JSON.stringify({ message: e.message}))
    }
}

const getAllTodos = async (_, response) => {
    const todos = await Todo.getTodos();

    response.writeHead(200, '200', {'Content-Type': 'application/json'});
    response.end(JSON.stringify(todos));
}
const getTodo = async (request, response) => {
    const urlData = request.url.split('/');
    const id  = urlData[urlData.length - 1];
    const todos = await Todo.getTodos(id);

    response.writeHead(200, '200', {'Content-Type': 'application/json'});
    response.end(JSON.stringify(todos));
}
const patchTodo = async (request, response) => {
    const urlData = request.url.split('/');
    const id  = urlData[urlData.length - 1];

    let todo_data = await getRequestData(request);

    let message = await Todo.updateTodo(id, JSON.parse(todo_data));

    response.writeHead(200, '200', {'Content-Type': 'application/json'});
    response.end(JSON.stringify(message));
}
const postTodo = async (request, response) => {
    let todo_data = await getRequestData(request);

    let todo = await Todo.createTodo(JSON.parse(todo_data));

    response.writeHead(200, '200', {'Content-Type': 'application/json'});
    response.end(JSON.stringify(todo));
}
const deleteTodo = async (request, response) => {
    const urlData = request.url.split('/');
    const id  = urlData[urlData.length - 1];

    let message = await Todo.deleteTodo(id);

    response.writeHead(200, '200', {'Content-Type': 'application/json'});
    response.end(JSON.stringify(message));
}

const getAllLocationsWithinBounds = async (request, response) => {
    let geoLocation = await getRequestData(request);
    geoLocation = JSON.parse(geoLocation);

    const locations = await Location.getLocation(undefined, geoLocation);

    response.writeHead(200, '200', {'Content-Type': 'application/json'});
    response.end(JSON.stringify({locations: locations}));
}

// route listener; routs request to proper processor
async function requestListener (request, response) {

    //Act as Get but I'm lazy to parse URL params so we use POST to be able to have a body
    if (request.url.match(/\api\/locations\/bound/) && request.method === POST) {
        safeExec(getAllLocationsWithinBounds, request, response);
    } else if (request.url.match(/\api\/todos\/([0-9]+)/) && request.method === GET) {
        safeExec(getTodo, request, response);
    } else if (request.url.match(/\api\/todos\/([0-9]+)/) && request.method === PATCH) {
        safeExec(patchTodo, request, response);
    } else if (request.url.match(/\api\/todos\/([0-9]+)/) && request.method === DELETE) {  
        safeExec(deleteTodo, request, response);
    } else if (request.url.includes('/api/todos') && request.method === POST) {
        safeExec(postTodo, request, response);
    } else if (request.url.includes('/api/todos') && request.method === GET) {
        safeExec(getAllTodos, request, response);
    }   else  if(request.url.match(/\api\/login/) && request.method === POST) {
        safeExec(authenticationController.validateUser,request,response);
    }  else  if(request.url.match(/\api\/secret/) && request.method === GET) {
        authorizedSafeExec(getAllTodos, request, response);
    } else if (request.method === GET) {
        handleFilesRequest(request, response);
    } else {
        //500 page here!?!
        response.writeHead(500, "SERVER ERROR (WRITTEN IN BACKEND)",  {'Content-Type': 'application/json'});
        response.end("SERVER ERROR (WRITTEN IN BACKEND)");
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

