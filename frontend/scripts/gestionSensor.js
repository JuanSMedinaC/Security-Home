const AddSensorBtn = document.getElementById('AddSensorBtn');
const DeleteSensorBtn = document.getElementById('DeleteSensorBtn');
const HistorialBtn = document.getElementById('HistorialBtn');
const GestAlarmBtn = document.getElementById('GestAlarmBtn');
const CameraBtn = document.getElementById('CameraBtn');
const iPadd = "http://127.0.0.1:8080"
const imagenLogout = document.getElementById("logout");

imagenLogout.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});


AddSensorBtn.addEventListener("click",function(){
    window.location.href="AddSensor.html";
})

DeleteSensorBtn.addEventListener("click",function(){
    window.location.href="DeleteSensor.html";
})

HistorialBtn.addEventListener("click",function(){
    window.location.href="historial.html";
})

CameraBtn.addEventListener("click",function(){
    window.location.href="Camera.html";
})

GestAlarmBtn.addEventListener("click",function(){
    window.location.href="gestionA.html";
})

const sensorCardContainer = document.getElementById('sensorCardContainer');

var parse = JSON.parse(window.localStorage.getItem('Authorization'));

async function getSensors(){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch('http://localhost:8080/sensor/all',{
        method: 'GET',
        headers: {
            'Authorization':parse.id
        }
    });

    if(response.status ===200){
        let json = await response.json();
        console.log(json);

        json.forEach(sensor => {
        var sensor = new SensorCard(sensor);
        console.log( sensor.render() );
        console.log(sensorCardContainer);
        sensorCardContainer.appendChild(sensor.render());    
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

getSensors();