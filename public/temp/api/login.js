async function login(){
   console.log("login started");
    const rootAPI = `http://localhost:8000/api/login`;
    console.log(document.getElementById('username_for_login').value);
    let body={
        username:document.getElementById('username_for_login').value,
        password:document.getElementById('password_for_login').value
    }

    
            
        
            fetch(rootAPI, {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type': 'application/json'}})
            .then(async (res) => {
                if (res.status === 400) {
                    alert("username or password incorrect. please try again.");
                }else
                if(res.status >=200 && res.status <=399){
                    const rootAPI2 = 'http://localhost:8000/api/ping'
                  let response= await fetch(rootAPI2,{method:'GET',headers:{'Content-Type': 'application/json'}})
                  response= await response.json();
                    console.log(response);
                alert("logged in");
              const form= document.querySelector('.login_form_container');
                form.classList.remove('expanded');
                form.classList.add('hidden');
        
                const acc = document.querySelector('.not_logged_in_buttons');
                acc.classList.remove('expanded_acc');
                acc.classList.add('hidden');
                const acc_logged = document.querySelector('.logged_in_buttons');
                acc_logged.classList.remove('hidden');
                acc_logged.classList.add('expanded_acc');
                  
                console.log(document.getElementById('username_for_login').value);
                 
                
                if(response.isAdmin==1)
                {window.location.replace("http://localhost:8000/temp/account/admin/");}
       
               // asteaptaPing(); // sau ping()?
            }
            })
            .catch(ex => {
                throw ex;
            });
        
                
        
        
        document.getElementById('username_for_login').value='';
        document.getElementById('password_for_login').value='';
}
    
// async function ping(){
//     const rootAPI = 'http://localhost:8000/api/ping';
//     fetch(rootAPI,  {method: 'GET', headers:{'Content-Type': 'application/json'}})
//     .then((res)=> {
//         if(res.status === 401){
//         console.log("trb login");
//         return 1;
//         }
//     return 0;
//     })
//     .catch(ex => {throw "error at ping()" + ex;});

// }


// function asteaptaPing(){
//     var interval = setInterval(async function(){
//         var counter = 0;
//         if(ping() != 0)
//         counter=1;
//         if(counter == 1)
//         return;
//     }, 7000)
    
// }

document.getElementById('login').addEventListener("click",login);

