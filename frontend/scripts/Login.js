const imagenExit = document.getElementById("exit");
const LogInBtn = document.getElementById("LogInBtn");

async function getUsers(){

    window.location.href = "Menu.html";

    let response = await fetch('127.0.0.1/user/all');
    let json = await response.json();
    console.log(json);

    json.forEach(user => {
    //generar objeto
    var card = new UserCard(user);

    //imprimir la card.render
    console.log(card.render());
    UserCardContainer.appendChild(card.render());
    });

}