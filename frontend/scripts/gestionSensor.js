const AddSensorBtn = document.getElementById('AddSensorBtn');
const DeleteSensorBtn = document.getElementById('DeleteSensorBtn');
const HistorialBtn = document.getElementById('HistorialBtn');
const GestAlarmBtn = document.getElementById('GestAlarmBtn');
const CameraBtn = document.getElementById('CameraBtn');
const iPadd = "http://127.0.0.1:8080"

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

getSensors();