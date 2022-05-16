const http = require("http");
const { url } = require("inspector");
const { getRequestData} = require('./utils/utils');

const port = 8000;
const host = 'localhost';
const GET = 'GET';
const PATCH = 'PATCH';
const POST = 'POST';
const DELETE = 'DELETE';



const safeExec = async (fn, request, response) => {
    try {
        await fn(request, response);
    } catch (e) {
        response.writeHead(404, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({ message: e}))
    }
}

const getAllTodos = async (_, response) => {
    response.end(JSON.stringify("getAllTodos"));
}
const getTodo = async (request, response) => {
   response.end(JSON.stringify("getTodo"));
}
const patchTodo = async (request, response) => {
    response.end(JSON.stringify("patchTodo" ));
}
const postTodo = async (request, response) => {
    response.end(JSON.stringify("postTodo"));
}
const deleteTodo = async (request, response) => {
    response.end(JSON.stringify("deleteTodo"));
}

const getAllLocationsWithinBounds = async (request, response) => {
    let geoLocation = await getRequestData(request);
    response.end(JSON.stringify("getAllLocationsWithinBounds"));
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
    }  else if (request.method === GET) {
        handleFilesRequest(request, response);
    } else {
        //404 page here!?!
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
// TO DO: CONTROLLERS + ROUTE EVERY ACTION

