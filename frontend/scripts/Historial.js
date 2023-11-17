const alarmCardContainer = document.getElementById('alarmCardContainer');
const imagenExit = document.getElementById("exit");

imagenExit.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});

var parse = JSON.parse(window.localStorage.getItem('Authorization'));

async function getAlerts(){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch('http://localhost:8080/alert/all',{
        method: 'GET',
        headers: {
            'Authorization':parse.id
        },
    });

    if(response.status ===200){
        let json = await response.json();
        console.log(json);
        if(json == ""){
            alert("No hay eventos actualmente");
        }

        json.forEach(alert => {
        var card = new AlertCard( alert );
        console.log(card.render() );
        console.log(alertCardContainer);
        alertCardContainer.appendChild(card.render());   
        });
    } else {
        switch (response.status) {
            case 403:
                alert("You do not have authorization");
                break;
            default:
                alert("No hay eventos actualmente");
                break;
        }
    }
}

getAlerts();