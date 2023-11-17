const nameE= document.getElementById('name');
const searchBtn = document.getElementById('searchBtn');
const iPadd = "http://127.0.0.1:8080"

var parse = JSON.parse(window.localStorage.getItem('Authorization'));

async function searchCamera(data){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch(iPadd+'/search/camera', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : parse.id
        }
    });
    
    if(response.status === 200){
        let json = await response.json();
        console.log(json);

        json.forEach(cam => {
        var card = new CameraCard(cam);
        console.log( card.render() );
        console.log(cameraCardContainer);
        cameraCardContainer.appendChild(card.render());    
        });
        window.location.href = "../CameraSearch.html";
    } else {
        alert(await response.text());
    }
}

getCameras();