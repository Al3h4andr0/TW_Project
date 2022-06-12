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



module.exports = { getRequestData };