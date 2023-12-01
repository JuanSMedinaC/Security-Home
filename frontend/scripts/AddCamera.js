const nameE= document.getElementById('name');
const descriptionE = document.getElementById('description');
const statusE = document.getElementById('status');
const addBtn = document.getElementById('addBtn');
const ip = document.getElementById('ip');
const iPadd = "http://127.0.0.1:8080"

addBtn.addEventListener('click', addCam);
var parse = JSON.parse(window.localStorage.getItem('Authorization'));

async function createCamera(data){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch(iPadd+'/AddCamera', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : parse.id
        },
        body: data
    });
    
    if(response.status === 200){
        alert("La cámara se añadió correctamente");
        window.location.href = "../Camera.html";
    }else{
        switch (response.status) {
            case 409:
                alert("La cámara ya existe");
                break;
            case 403:
                alert("No se puede añadir correctamente");
                break;
            default:
                alert("Error");
                break;
        }
    }

    let json = await response.json(); 
    console.log(json);
}

async function addCam(event){
    event.preventDefault();
    let name = nameE.value;
    let description = descriptionE.value;
    let status = statusE.value;
    let url = ip.value;
    if (name === '' || description === '' || status === '' || url === '') {
        alert("Por favor complete todos los espacios para añadir la cámara");
        return;
    }
    let cameraDTO = {
        name: name,
        description: description,
        status: status,
        url: url
    };
    let json = JSON.stringify(cameraDTO);
    console.log(json);
    createCamera(json);
}
