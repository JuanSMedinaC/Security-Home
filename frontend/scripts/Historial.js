const alertCardContainer = document.getElementById('alertCardContainer');
const recent = document.getElementById('recent');
const older = document.getElementById('older');
const imagenLogout = document.getElementById("logout");

imagenLogout.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});

recent.addEventListener('click', orderRecent);
older.addEventListener('click', orderOlder);

var parse = JSON.parse(window.localStorage.getItem('Authorization'));

async function fetchAndRenderAlerts(sortFunction) {
    let auth = localStorage.getItem('Authorization');
    let response = await fetch('http://localhost:8080/alert/all', {
        method: 'GET',
        headers: {
            'Authorization': parse.id,
        },
    });

    if (response.status === 200) {
        let json = await response.json();
        console.log(json);
        if (json.length === 0) {
            alert('No hay eventos actualmente');
        }

        // Clear existing cards
        alertCardContainer.innerHTML = '';

        // Sort and render cards
        json.sort(sortFunction);
        json.forEach((alert) => {
            var card = new AlertCard(alert);
            console.log(card.render());
            alertCardContainer.appendChild(card.render());
        });
    } else {
        switch (response.status) {
            case 403:
                alert('You do not have authorization');
                break;
            default:
                alert('No hay eventos actualmente');
                break;
        }
    }
}

async function orderRecent() {
    await fetchAndRenderAlerts((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

async function orderOlder() {
    await fetchAndRenderAlerts((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));
}

async function getAlerts() {
    await fetchAndRenderAlerts((a, b) => 0);
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


getAlerts();
