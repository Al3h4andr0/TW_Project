async function login(){
   console.log("login started");
    const rootAPI = `http://localhost:8000/api/login`;
    console.log(document.getElementById('username_for_login').value);
    let body={
        username:document.getElementById('username_for_login').value,
        password:document.getElementById('password_for_login').value
    }


    fetch(rootAPI, {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type': 'application/json'}})
    .then((res) => {
        if (res.status === 404) {
            alert("username or password incorrect brother");
        }else
        if(res.status >=200 && res.status <=399){
        alert("logged in");
      const form= document.querySelector('.login_form_container');
        form.classList.remove('expanded');
        form.classList.add('hidden');
        asteaptaPing(); // sau ping()?
    }
    })
    .catch(ex => {
        throw ex;
    });

        document.getElementById('username_for_login').value='';
        document.getElementById('password_for_login').value='';
}

async function ping(){
    const rootAPI = 'http://localhost:8000/api/ping';
    fetch(rootAPI,  {method: 'GET', headers:{'Content-Type': 'application/json'}})
    .then((res)=> {
        if(res.status === 401){
        alert("trb login");
        return 1;
        }
    return 0;
    })
    .catch(ex => {throw "eroare bossule" + ex;});
    console.log("gata ping bro");
}

setInterval(ping,5000);

function asteaptaPing(){
    var interval = setInterval(async function(){
        var counter = 0;
        if(ping() != 0)
        counter=1;
        if(counter == 1)
        return;
    }, 5000)
    
}

document.getElementById('login').addEventListener("click",login);

