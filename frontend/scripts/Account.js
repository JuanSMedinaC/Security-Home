const userNameLabel = document.getElementById("userNameLabel");
const mailLabel = document.getElementById("mailLabel");
const passwordButton = document.getElementById("passwordButton");
const iPadd = "http://127.0.0.1:8080"

passwordButton.addEventListener("click",function(){
    window.location.href="../updatePassword.html";
})


window.addEventListener("load",verifyLogin)
function home(){
    window.location.href="Scripts/VistaUsuario.html"
}

async function verifyLogin(){
    let auth=localStorage.getItem("Authorization");
    //fetch
    let response = await fetch(iPadd+'/auth', {
        method: 'GET',
        headers: {
            'Authorization': auth
        }
    }).then(res => {
        console.log(res);
        if (res.status!=200){
            home();
        }
        return res.json();
    })
    .then(data => {
            console.log(data)  
            userNameLabel.textContent=data.n
            mailLabel.textContent=data.e
        })  

    
    return true;
}
