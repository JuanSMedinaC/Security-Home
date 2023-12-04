const nameE= document.getElementById('name');
const descriptionE = document.getElementById('description');
const statusE = document.getElementById('status');
const addBtn = document.getElementById('addBtn');
const ip = document.getElementById('ip');
const iPadd = "http://127.0.0.1:8080"
const imagenLogout = document.getElementById("logout");

imagenLogout.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});

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
        window.location.href = "../CamerasAll.html";
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


window.addEventListener("load",verifyLogin)


async function verifyLogin(){
    let user=localStorage.getItem("Authorization");
    user = JSON.parse(user);
    try{
        var auth = user.id
    }catch (error){
        window.location.href="../VistaUsuario.html"
    }
    
    
    //fetch
    let response = await fetch(iPadd+'/auth', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
        },
    });
    if(response.status == 200){
        console.log(response)
        let responseData = await response.json();
        userNameLabel.textContent=responseData.n
        mailLabel.textContent=responseData.e
        console.log(responseData);
    }else{
        window.location.href="../VistaUsuario.html"
    } 
    return true;
}


