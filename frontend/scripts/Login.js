const imagenExit = document.getElementById("exit");
const logInBtn = document.getElementById("LogInBtn");
const emailTextField = document.getElementById("emailInput");
const passwordTextField = document.getElementById("passInput");
const iPadd = "http://127.0.0.1:8080"

window.addEventListener("load",verifyLogin)
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
        if(responseData.r==1){
            window.location.href="../VistaAdministrador.html"
        }
        else{
            window.location.href="../Menu.html";
        }
        
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
        window.location.href="../Menu.html"
    }else{
        window.location.href="../VistaUsuario.html"
    }     
    return true;
}
