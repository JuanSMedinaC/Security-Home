const alarmCardContainer = document.getElementById('alarmCardContainer');

var parse = JSON.parse(window.localStorage.getItem('Authorization'));

async function getalarms(){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch('http://localhost:8080/alarm/all',{
        method: 'GET',
        headers: {
            'Authorization':parse.id
        },
    });

    if(response.status ===200){
        let json = await response.json();
        console.log(json);

        json.forEach(alarm => {
        var card = new AlarmCard( alarm );
        console.log( card.render() );
        console.log(alarmCardContainer);
        alarmCardContainer.appendChild(card.render());    
        });
    } else {
        alert(await response.text());
    }
}

getalarms();