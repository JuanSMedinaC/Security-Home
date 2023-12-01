const nameE = document.getElementById('name');
const typeE = document.getElementById('type');
const referenceE = document.getElementById('reference');
const locationE = document.getElementById('location');
const statusE = document.getElementById('status');
const addBtn = document.getElementById('addBtn');
const imagenLogout = document.getElementById("logout");

imagenLogout.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});

addBtn.addEventListener('click', sendAlarm);
var parse = JSON.parse(window.localStorage.getItem('Authorization'));

async function createAlarm(data){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch('http://127.0.0.1:8080/alarm/add',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : parse.id
        },
        body:data
    });

    if(response.status === 200){
        window.location.href="../gestionA.html"
        alert("Alarm successfully added");
    }else{
        switch (response.status) {
            case 409:
                alert("Alarm was already created");
                break;
            case 403:
                alert("Couldn't be added a alarm correctly");
                break;
            default:
                alert("Error");
                break;
        }
    }
    
    let json = await response.json(); 
    console.log(json);
}

async function sendAlarm(){
    let name = nameE.value;
    let type = typeE.value;
    let reference = referenceE.value;
    let location = locationE.value;
    let status = statusE.value;
    let alarmDTO = {
        name : name, 
        type : type, 
        reference : reference,
        location : location,
        status : status
    }

    let json = JSON.stringify(alarmDTO);
    console.log(json);
    await createAlarm(json); 
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
