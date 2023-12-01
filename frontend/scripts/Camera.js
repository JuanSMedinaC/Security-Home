const AddCamBtn = document.getElementById('AddCamBtn');
const DelCamBtn = document.getElementById('DelCamBtn');
const InfCamBtn = document.getElementById('InfCamBtn');
const HistorialBtn = document.getElementById('HistorialBtn');
const GestAlarmBtn = document.getElementById('GestAlarmBtn');
const GestSenBtn = document.getElementById('GestSenBtn');
const iPadd = "http://127.0.0.1:8080"
const imagenLogout = document.getElementById("logout");

imagenLogout.addEventListener("click", function() {
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

