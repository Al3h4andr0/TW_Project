const jsonReader = require("./jsonReader");
const fs = require('fs');
const jsonWriter = (filePath, objects, cb) =>
{
    fs.writeFile(filePath,JSON.stringify(objects,null,2),(err) => {
        if(err)
            {console.log("error", err);
            return cb && cb(err);}
        return cb(null);
    })
}
module.exports = jsonWriter;