const cameraCardContainer = document.getElementById('cameraCardContainer');

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