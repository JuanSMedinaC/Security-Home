const alarmCardContainer = document.getElementById('alarmCardContainer');
const imagenLogout = document.getElementById("logout");
const addAlarm = document.getElementById("addAlarm");

imagenLogout.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});

addAlarm.addEventListener("click", function(){
    window.location.href = "addAlarm.html";
});

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


getalarms();
