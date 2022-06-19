

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
locationListener();
userListener();
