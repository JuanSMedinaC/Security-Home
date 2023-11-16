const nameE= document.getElementById('name');
const descriptionE = document.getElementById('description');
const statusE = document.getElementById('status');
const addBtn = document.getElementById('addBtn');
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
        alert("camera successfully added");
    }else{
        switch (response.status) {
            case 409:
                alert("Camera was already created");
                break;
            case 403:
                alert("Couldn't be added a camera correctly");
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
    if (name === '' || description === '' || status === '') {
        alert("Please complete all fields before adding the camera");
        return;
    }
    let cameraDTO = {
        name: name,
        description: description,
        status: status
    };
    let json = JSON.stringify(cameraDTO);
    console.log(json);
    createCamera(json);
}
