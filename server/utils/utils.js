var FormData = require("form-data");

function getRequestData(request) {
   
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            request.on('data', (chunk) => {
                body += chunk.toString();
            });

            request.on('end', () => {
                resolve(body);
            });
           
        } catch (error) {
            console.log("GET REQUEST DATA ERROR: ", error);
            reject(error);
        }
    })
}

function getFormRequestData(request)
{
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            request.on('data', (chunk) => {
                body = new FormData(chunk.toString);
            });

            request.on('end', () => {
                resolve(body);
            });
           
        } catch (error) {
            console.log("GET REQUEST DATA ERROR: ", error);
            reject(error);
        }
    })
}



module.exports = { getRequestData,getFormRequestData };