const imagenExit = document.getElementById("exit");
const logInBtn = document.getElementById("LogInBtn");
const emailTextField = document.getElementById("emailInput");
const passwordTextField = document.getElementById("passInput");
const iPadd = "http://127.0.0.1:8080"

logInBtn.addEventListener("click", sendUser);

function log(){
    key=localStorage.getItem("Authorization");
    console.log(key);
    window.location.href="../Menu.html";
}

async function createUser(data){
    //fetch
    let response = await fetch(iPadd+'/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: data
    }).then(res => {
        //console.log(res);
        if (res.status==200){
            log();
        }
        return res.json();
    })
    .then(data => {
            //console.log(data)
            localStorage.setItem("Authorization",data.id)   
        })    
}

async function sendUser(){
    let email = emailTextField.value;
    let pass = passwordTextField.value;
    let userDTO = {
        e: email,
        p: pass
    };
    let json = JSON.stringify(userDTO);
    console.log(json);
    createUser(json);
    
}
