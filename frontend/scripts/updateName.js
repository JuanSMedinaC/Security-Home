const userNameInput = document.getElementById("userNameInput");
const passwordInput = document.getElementById("passwordInput");
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
    let username = userNameInput.value;
    let pass = passwordInput.value;
    let user = {
        n: username,
        p: pass
    };
    let json = JSON.stringify(user);
    console.log(json);
    changeUserName(json);
}

async function changeUserName(data){
    let user = localStorage.getItem("Authorization");
    user = JSON.parse(user);
    let auth = user.id;
    await fetch(iPadd+'/user/edit/name', {
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
        let responseData = await response.json();
        console.log(responseData);
    }else{
        window.location.href="../VistaUsuario.html"
    }     
    return true;
}
