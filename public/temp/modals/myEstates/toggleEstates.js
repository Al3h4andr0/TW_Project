export async function toggleEstatesOn(){
        var estatesDiv = document.getElementById('my_estates_content');
        estatesDiv.classList.remove("hidden");
        estatesDiv.classList.remove("expanded");
}

export function toggleEstatesOff(){
    const myEstates = new myEstatesModal(document.getElementById('my_estates_content'));
        myEstates.render();
        var estatesDiv = document.getElementById('my_estates_content');
        estatesDiv.classList.remove("expanded");
        estatesDiv.classList.remove("hidden");
}