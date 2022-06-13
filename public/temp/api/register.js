

async function register(){
   
    const rootAPI = `http://localhost:8000/api/register`;
    
    
    let body={
        username:document.getElementById('username').value,
        password:document.getElementById('password').value
    }
    try {
        let register =  await fetch(rootAPI, {method: 'POST', body: JSON.stringify(body), headers:{'Content-Type': 'application/json'}});
        console.log(register);
    } catch (e) {
        throw e;
    } finally{
        document.getElementById('username').value='';
        document.getElementById('password').value='';
      const form= document.querySelector('.register_form_container');
      form.classList.remove('expanded');
      form.classList.add('hidden');
        console.log(body);
    
    }

    
}

document.getElementById('register').addEventListener("click",register);