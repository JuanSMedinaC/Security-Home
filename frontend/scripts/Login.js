const imagenExit = document.getElementById("exit");
const logInBtn = document.getElementById("LogInBtn");
const emailTextField = document.getElementById("emailInput");
const passwordTextField = document.getElementById("passInput");
const iPadd = "http://127.0.0.1:8080"

logInBtn.addEventListener("click", sendUser);

async function createUser(data){
    //fetch
    let response = await fetch(iPadd+'/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:data
    });
    if(response.status == 200){
        let responseData = await response.json();
        console.log(responseData);
        window.localStorage.setItem("Authorization",JSON.stringify(responseData))
        window.location.href="../Menu.html";
    }else{
        alert(await response.text());
    } 
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
