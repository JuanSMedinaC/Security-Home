const AddCamBtn = document.getElementById('AddCamBtn');
const DelCamBtn = document.getElementById('DelCamBtn');
const InfCamBtn = document.getElementById('InfCamBtn');
const HistorialBtn = document.getElementById('HistorialBtn');
const GestAlarmBtn = document.getElementById('GestAlarmBtn');
const GestSenBtn = document.getElementById('GestSenBtn');
const iPadd = "http://127.0.0.1:8080"
const imagenExit = document.getElementById("logout");

imagenExit.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});

AddCamBtn.addEventListener("click",function(){
    window.location.href="/AddCamera.html";
})

DelCamBtn.addEventListener("click",function(){
    window.location.href="/DeleteCamera.html";
})

InfCamBtn.addEventListener("click",function(){
    window.location.href="/CamerasAll.html";
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
