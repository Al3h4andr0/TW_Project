const rootAPIDelete = "http://localhost:8000/api/locations/"


export async function deleteEstate(id) {
    console.log("deletestate has been pressed");
    fetch(rootAPIDelete + id, {method: 'DELETE', headers:{'Content-Type': 'application/json'}})
.then((res) => {
    if(res.status >=200 && res.status <=399){
    alert("instance deleted successfully. ");
    } else
    alert("could not delete this location. please try again.");
})
.catch(ex => {
    throw ex;
});
}