const name= document.getElementById('name');
const description = document.getElementById('description');
const status = document.getElementById('status');
const addBtn = document.getElementById('addBtn');
const iPadd = "http://127.0.0.1:8080"

addBtn.addEventListener("click", addCam);

async function createCamera(data){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch(iPadd+'/AddCamera', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : auth
        },
        body: data
    });

    let json = await response.json(); 
    console.log(json);
}

async function addCam(){
    let name = name.value;
    let description = description.value;
    let status = status.value;
    let cameraDTO = {
        name: name,
        description: description,
        status: status
    };
    let json = JSON.stringify(cameraDTO);
    console.log(json);
    createUser(json);
}
