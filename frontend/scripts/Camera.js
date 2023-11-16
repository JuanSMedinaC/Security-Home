const AddCamBtn = document.getElementById('AddCamBtn');
const DelCamBtn = document.getElementById('DelCamBtn');
const InfCamBtn = document.getElementById('InfCamBtn');
const EditCamBtn = document.getElementById('EditCamBtn');
const HistorialBtn = document.getElementById('HistorialBtn');
const GestAlarmBtn = document.getElementById('GestAlarmBtn');
const GestSenBtn = document.getElementById('GestSenBtn');
const iPadd = "http://127.0.0.1:8080"

AddCamBtn.addEventListener("click",function(){
    window.location.href="/AddCamera.html";
})

DelCamBtn.addEventListener("click",function(){
    window.location.href="/DeleteCamera.html";
})

InfCamBtn.addEventListener("click",function(){
    window.location.href="/CamerasAll.html";
})

EditCamBtn.addEventListener("click",function(){
    window.location.href="/CamEditStatus.html";
})

HistorialBtn.addEventListener("click",function(){
    window.location.href="/historial.html";
})

GestAlarmBtn.addEventListener("click",function(){
    window.location.href="/gestionA.html";
})

GestSenBtn.addEventListener("click",function(){
    window.location.href="/gestionS.html";
})
