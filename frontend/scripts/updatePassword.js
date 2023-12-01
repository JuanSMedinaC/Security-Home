const actPass = document.getElementById("actPass");
const newPass = document.getElementById("newPass");
const confNewPass = document.getElementById("confNewPass");
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");
const iPadd = "http://127.0.0.1:8080"
const imagenLogout = document.getElementById("logout");

imagenLogout.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});
cancelButton.addEventListener("click",function(){
    window.location.href="Account.html"
})

submitButton.addEventListener("click",createObject)

function createObject(){
    let actualPass = actPass.value;
    if(newPass.value==confNewPass.value){
        var pass= newPass.value;
    }else{
        window.location.reload();
    }
    
    let passwords = {
        oldPass: actualPass,
        newPass: pass
    };
    let json = JSON.stringify(passwords);
    console.log(json);
    changePassword(json);
}

async function changePassword(data){
    let user = localStorage.getItem("Authorization");
    user = JSON.parse(user);
    try{
        var auth = user.id
    }catch (error){
        window.location.href="../VistaUsuario.html"
    }
    await fetch(iPadd+'/user/edit/password', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
        },
        body: data
    }).then(res => {
        if (res.status==200){
            window.location.href="../Account.html"
        }
        return res.json();
    })
    .then(data => {
        })    
    return true;
}



window.addEventListener("load",verifyLogin)

async function verifyLogin(){
    let user=localStorage.getItem("Authorization");
    user = JSON.parse(user);
    let auth = user.id
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
    }else{
        window.location.href="../VistaUsuario.html"
    }     
    return true;
}
