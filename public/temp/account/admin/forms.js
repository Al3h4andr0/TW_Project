

const locationListener = () => {
    const myForm = document.getElementById("location");
    myForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let rootAPI = `http://localhost:8000/api/locations/`;
        const formData = new FormData(myForm);
        
        rootAPI+=formData.get('location');
        console.log(rootAPI);

        fetch(rootAPI, {method: 'DELETE'})
        .then((res) => {
            if (res.status === 404) {
                alert("id not found");
            }else
            if(res.status >=200 && res.status <=399){
            alert("deleted");

            document.getElementById('location').value='';
            document.getElementById('user').value='';
        }
        })
        }
    

        )

}

const userListener = () => {
    const myForm = document.getElementById("user");
    myForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let rootAPI = `http://localhost:8000/api/admin/users/`;
        const formData = new FormData(myForm);
        
        rootAPI+=formData.get('user');
        console.log(rootAPI);

        fetch(rootAPI, {method: 'DELETE'})
        .then((res) => {
            if (res.status === 404) {
                alert("id not found");
            }else
            if(res.status >=200 && res.status <=399){
            alert("deleted");
         
        }
        })
        }
    

        )

}

const uploadLocations =() =>
{
    const myForm = document.getElementById("import_loc");
    myForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let rootAPI = `http://localhost:8000/api/admin/uploadLocations`;
        const formData = new FormData(myForm);

        fetch(rootAPI, {method: 'POST', body:formData})
        .then((res) => {
            if (res.status === 404) {
                alert("Sth went wrong");
            }else
            if(res.status >=200 && res.status <=399){
            alert("Uploaded");
         
        }
        })
        }
    

        )

}
const uploadUsers =() =>
{
    const myForm = document.getElementById("import_us");
    myForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let rootAPI = `http://localhost:8000/api/admin/uploadUsers`;
        const formData = new FormData(myForm);

        fetch(rootAPI, {method: 'POST', body:formData})
        .then((res) => {
            if (res.status === 404) {
                alert("Sth went wrong");
            }else
            if(res.status >=200 && res.status <=399){
            alert("Uploaded");
         
        }
        })
        }
    

        )

}
function getLocations()
{
    let rootAPI = `http://localhost:8000/api/admin/getLocations`;
    fetch(rootAPI, {method: 'POST'})
        .then(async (res) => {
            if (res.status === 404) {
                alert("Sth went wrong");
            }else
            if(res.status >=200 && res.status <=399){
            res= await res.json();
            res=JSON.stringify(res);
            //console.log(res);
            var textFile=null;
            var data = new Blob([res], {type: 'text/plain'});

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
              window.URL.revokeObjectURL(textFile);
            }
        
            textFile = window.URL.createObjectURL(data);
           var link= document.createElement('a');
           link.setAttribute('download','locations.json');
           link.href=textFile;
           var txt =document.createElement('p');
           txt.textContent="Download locations.json";
           link.appendChild(txt);
           document.body.appendChild(link);

        }
        })

}
function getUsers()
{
    let rootAPI = `http://localhost:8000/api/admin/getUsers`;
    fetch(rootAPI, {method: 'POST'})
        .then(async (res) => {
            if (res.status === 404) {
                alert("Sth went wrong");
            }else
            if(res.status >=200 && res.status <=399){
                res= await res.json();
                res=JSON.stringify(res);
                //console.log(res);
                var textFile=null;
                var data = new Blob([res], {type: 'text/plain'});
    
                // If we are replacing a previously generated file we need to
                // manually revoke the object URL to avoid memory leaks.
                if (textFile !== null) {
                  window.URL.revokeObjectURL(textFile);
                }
            
                textFile = window.URL.createObjectURL(data);
               var link= document.createElement('a');
               link.setAttribute('download','locations.json');
               link.href=textFile;
               var txt =document.createElement('p');
               txt.textContent="Download users.json";
               link.appendChild(txt);
               document.body.appendChild(link);
         
        }
        })
}
uploadUsers();
uploadLocations();
locationListener();
userListener();
document.getElementById('export_locations').addEventListener("click",getLocations);
document.getElementById('export_users').addEventListener("click",getUsers);
