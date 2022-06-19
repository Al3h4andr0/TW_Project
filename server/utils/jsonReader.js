const fs = require('fs');

const jsonReader = (filePath, cb) =>
{

var allLocations = [];

fs.readFile(filePath, 'utf-8', (err, jsonString) => {
    if (err) {
        console.log(err);
        return cb && cb(err);
    }
    try{
       const jsonData = JSON.parse(jsonString);
       return cb && cb(null,jsonString);
    }catch(e)
    {
        console.error('error parsing json', e);
        return cb && cb(err);
    }
 
})

}


module.exports = jsonReader;