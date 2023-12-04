const referenceE= document.getElementById('reference');
const deleteBtn = document.getElementById('deleteBtn');
const iPadd = "http://127.0.0.1:8080"
const imagenLogout = document.getElementById("logout");

imagenLogout.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});

deleteBtn.addEventListener('click', createObject);
var parse = JSON.parse(window.localStorage.getItem('Authorization'));

function createObject(event){
    event.preventDefault();
    let reference = referenceE.value;
    if (reference === '') {
        alert("Please complete all fields");
        return;
    }
    let sensorDTO = {
        reference: reference
    };
    let json = JSON.stringify(sensorDTO);
    console.log(json);
    deleteSensor(json);
}

async function deleteSensor(data){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch(iPadd+'/sensor/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : parse.id
        },
        body: data
    });
    
    if(response.status === 200){
        window.location.href="../gestionS.html"
        alert("sensor correctly deleted");
    }else{
        switch (response.status) {
            case 404:
                alert("sensor not found");
                break;
            case 403:
                alert("You do not have authorization");
                break;
            default:
                alert("Error");
                break;
        }
    }

    let json = await response.json(); 
    console.log(json);
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


