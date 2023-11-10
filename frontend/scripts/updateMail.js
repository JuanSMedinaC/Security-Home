const mailInput = document.getElementById("mailInput");
const passwordInput = document.getElementById("passwordInput");
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");
const iPadd = "http://127.0.0.1:8080"

cancelButton.addEventListener("click",function(){
    window.location.href="Account.html"
})

submitButton.addEventListener("click",createObject)

function createObject(){
    let mail = mailInput.value;
    let pass = passwordInput.value;
    let user = {
        e: mail,
        p: pass
    };
    let json = JSON.stringify(user);
    console.log(json);
    changeEmail(json);
}

async function changeEmail(data){
    let auth = localStorage.getItem("Authorization");
    await fetch(iPadd+'/user/edit/mail', {
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
        })  

    
    return true;
}
