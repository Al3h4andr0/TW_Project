const { getRequestData } = require('../utils/utils');
const fs = require('fs').promises;

class PhotoController{
    async getPhoto(request,response)
    {
        const photoName = request.url.split("?photo=")[1];
        let path="../server/data/photos/" + photoName;
        try{
            fs.readFile(path).then((contents) => {
                response.writeHead(200, { 'Content-Type': 'text/plain' });
                response.end(contents);
            }
            );
        }
        catch(e)
        {
            console.log("RSERSEERRRORRRRR", e);
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end("Good");
        }
        
    }
}

module.exports = PhotoController;