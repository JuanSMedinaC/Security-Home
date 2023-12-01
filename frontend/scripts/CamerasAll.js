const cameraCardContainer = document.getElementById('cameraCardContainer');

const nameE= document.getElementById('name');
const searchBtn = document.getElementById('searchBtn');

var parse = JSON.parse(window.localStorage.getItem('Authorization'));
const imagenLogout = document.getElementById("logout");

imagenLogout.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});
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
