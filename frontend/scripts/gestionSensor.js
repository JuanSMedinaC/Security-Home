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