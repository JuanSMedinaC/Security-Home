const alarmCardContainer = document.getElementById('alarmCardContainer');

if(window.localStorage.getItem('alarm') === null){
    window.location.href = '/signin.html';
} else {
    var parse = JSON.parse(window.localStorage.getItem('alarm'));
}

console.log(parse);


async function getalarms(){
    let response = await fetch('https://7f93-200-3-193-78.ngrok-free.app/alarm/all',{
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
        alarmCardContainer.appendChild(card.render());    
        });
    } else {
        alert(await response.text());
    }
}

getalarms();