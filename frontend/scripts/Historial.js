const alarmCardContainer = document.getElementById('alarmCardContainer');

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

        json.forEach(alert => {
        var card = new AlertCard( alert );
        console.log(card.render() );
        console.log(alertCardContainer);
        alertCardContainer.appendChild(card.render());    
        });
    } else {
        alert(await response.text());
    }
}

getAlerts();