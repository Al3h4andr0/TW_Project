async function logout(){

     const rootAPI = `http://localhost:8000/api/logout`;
     
     fetch(rootAPI, {method: 'POST', headers:{'Content-Type': 'application/json'}})
     .then((res) => {
         if(res.status >=200 && res.status <=399){
         alert("logged out. see u soon.");
         const acc = document.querySelector('.not_logged_in_buttons');
         acc.classList.remove('hidden');
         acc.classList.add('expanded_acc');
         const acc_logged = document.querySelector('.logged_in_buttons');
         acc_logged.classList.remove('expanded_acc');
         acc_logged.classList.add('hidden');
         const hello = document.getElementById("helloname").innerHTML="";
     }
     })
     .catch(ex => {
         throw ex;
     });
 }