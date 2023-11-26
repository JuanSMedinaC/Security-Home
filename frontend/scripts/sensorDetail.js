const sensorNameLabel = document.getElementById('sensorNameLabel');
const locationLabel = document.getElementById('locationLabel');
const statusLabel = document.getElementById('statusLabel');
const distanceLabel = document.getElementById('distanceLabel');
const imagenExit = document.getElementById("exit");
const iPadd = "http://127.0.0.1:8080"

imagenExit.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});
window.addEventListener("load",verifyLogin);

async function getSensor(){
    let user=localStorage.getItem("Authorization");
    user = JSON.parse(user);

    let sensorId=localStorage.getItem("sensorID");

    try{
        var auth = user.id
    }catch (error){
        
    }
    //fetch
    let response = await fetch(iPadd+'/sensor/'+sensorId, {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
        },
    });
    if(response.status == 200){
        let responseData = await response.json();
        console.log(responseData);
        sensorNameLabel.textContent=responseData.name;
        locationLabel.textContent=responseData.location;
        statusLabel.textContent=responseData.status;

        updateDistance();
        
    }
    return true;
}

async function updateDistance(){
    let user=localStorage.getItem("Authorization");
    user = JSON.parse(user);
    try{
        var auth = user.id
    }catch (error){
        
    }
    //fetch
    let response = await fetch(iPadd+'/reading/last/1', {
        method: 'GET',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
        },
    });
    if(response.status == 200){
        let responseData = await response.json();
        console.log(responseData);
        distanceLabel.textContent=responseData.sensorValues+ responseData.units;
        var delayInMilliseconds = 200; 

        setTimeout(function() {
            updateDistance();
        }, delayInMilliseconds);
    }
    return true;
}

async function verifyLogin(){
    let user=localStorage.getItem("Authorization");
    user = JSON.parse(user);
    try{
        var auth = user.id
    }catch (error){
        
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
        let responseData = await response.json();
        console.log(responseData);
        getSensor();
    }else{
        window.location.href="../VistaUsuario.html";
    }
    return true;
}