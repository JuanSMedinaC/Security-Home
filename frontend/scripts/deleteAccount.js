const actPass = document.getElementById("actPass");
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");
const iPadd = "http://127.0.0.1:8080"

cancelButton.addEventListener("click",function(){
    window.location.href="Account.html"
})

submitButton.addEventListener("click",createObject)

function createObject(){  
    let password = {
        pass: actualPass
    };
    let json = JSON.stringify(passwords);
    console.log(json);
    deletAccount(json);
}

async function deletAccount(data){
    let auth = localStorage.getItem("Authorization");
    await fetch(iPadd+'/user/delete', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
        },
        body: data
    }).then(res => {
        if (res.status==200){
            window.location.href="../Account.html"
            localStorage.removeItem("Authorization");
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
