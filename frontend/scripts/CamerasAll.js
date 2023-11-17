const cameraCardContainer = document.getElementById('cameraCardContainer');
const imagenExit = document.getElementById("exit");

imagenExit.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});
const nameE= document.getElementById('name');
const searchBtn = document.getElementById('searchBtn');

var parse = JSON.parse(window.localStorage.getItem('Authorization'));

async function getCameras(){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch('http://localhost:8080/camerasAll',{
        method: 'GET',
        headers: {
            'Authorization':parse.id
        }
    });

    if(response.status ===200){
        let json = await response.json();
        console.log(json);

        json.forEach(cam => {
        var card = new CameraCard(cam);
        console.log( card.render() );
        console.log(cameraCardContainer);
        cameraCardContainer.appendChild(card.render());    
        });
    } else {
        alert(await response.text());
    }

    
}

getCameras();

searchBtn.addEventListener('click', createObject);

function createObject(event){
    console.log("aqui");
    event.preventDefault();
    let name = nameE.value;
    if (name === '') {
        alert("Please complete all fields");
        return;
    }else{
        let cameraDTO = {
            name: name
        };
        let json = JSON.stringify(cameraDTO);
        console.log(json);
        searchCamera(json);
    }
}

async function searchCamera(data){

    let response = await fetch('http://localhost:8080/search/camera', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : parse.id
        }, 
        body: data,
        redirect: 'follow'
    });
    
    if(response.status === 200){
        let cam = await response.json();
        console.log(cam);
        
        var card = new CameraCard(cam);
        console.log( card.render() );
        console.log(cameraCardContainer);
        cameraCardContainer.innerHTML = '';
        cameraCardContainer.appendChild(card.render());    
        
    } else {
        alert(await response.text());
    }
}