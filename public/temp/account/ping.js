export async function ping(){
    const rootAPI = 'http://localhsot:8000/api/ping';
    fetch(rootAPI,  {method: 'GET', headers:{'Content-Type': 'application/json'}})
    .then((res)=> {
        if(res.status === 401){
        alert('trb login');
            return 1;
    }else 
        if(res.status === 200){
        alert('pagina cu butonase');
            return 2;
    }
    })
    .catch(ex => {throw ex;});
    console.log("gata ping bro");
}

setInterval(CheckSession(),500);