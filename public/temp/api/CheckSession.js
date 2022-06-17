import Authentication from "C:\\Users\\ioan_\\Documents\\GitHub\\TW_Project\\server\\controller\\authentication.js";


function CheckSession() {
   
    let requestJwtFromHeader = getCookieFromHeader(request,"jwt");
    if(requestJwtFromHeader === null)
      alert("session expired. you need to log in again.");
}

setInterval(CheckSession(),500);