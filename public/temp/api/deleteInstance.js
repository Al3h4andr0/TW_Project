// async function deleteInstance(id){

//     const rootAPI = `http://localhost:8000/api/locations/${id}`;
    
//     fetch(rootAPI, {method: 'DELETE', headers:{'Content-Type': 'application/json'}})
//     .then((res) => {
//         if(res.status >=200 && res.status <=399){
//         alert("instance deleted successfully. ");
//     }
//     })
//     .catch(ex => {
//         throw ex;
//     });
// }