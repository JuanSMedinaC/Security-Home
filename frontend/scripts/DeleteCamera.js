const nameE= document.getElementById('name');
const deleteBtn = document.getElementById('deleteBtn');
const iPadd = "http://127.0.0.1:8080"

deleteBtn.addEventListener('click', createObject);
var parse = JSON.parse(window.localStorage.getItem('Authorization'));

function createObject(event){
    event.preventDefault();
    let name = nameE.value;
    if (name === '') {
        alert("Please complete all fields before adding the camera");
        return;
    }
    let cameraDTO = {
        name: name
    };
    let json = JSON.stringify(cameraDTO);
    console.log(json);
    deleteCamera(json);
}

async function deleteCamera(data){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch(iPadd+'/deleteCamera', {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : parse.id
        },
        body: data
    });
    
    if(response.status === 200){
        window.location.href="../Camera.html"
        alert("camera correctly deleted");
    }else{
        switch (response.status) {
            case 404:
                alert("camera not found");
                break;
            case 403:
                alert("You do not have authorization");
                break;
            default:
                alert("Error");
                break;
        }
    }

    let json = await response.json(); 
    console.log(json);
}

