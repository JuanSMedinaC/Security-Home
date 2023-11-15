const usernameInput = document.getElementById('usernameInput');
const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');
const passAgainInput = document.getElementById('passAgainInput');
const submitBtn = document.getElementById('submitBtn');
const userCardContainer = document.getElementById('userCardContainer');

if(window.localStorage.getItem('user') === null){
    window.location.href = '/signin.html';
} else {
    var parse = JSON.parse(window.localStorage.getItem('user'));
}

console.log(parse);


async function getUsers(){
    let response = await fetch('https://7f93-200-3-193-78.ngrok-free.app/user/all',{
        method: 'GET',
        headers: {
            'Authorization':parse.id
        },
    });

    if(response.status ===200){
        let json = await response.json();
        console.log(json);

        json.forEach(user => {
        var card = new UserCard( user );
        console.log( card.render() );
        userCardContainer.appendChild(card.render());    
        });
    } else {
        alert(await response.text());
    }
}

getUsers();