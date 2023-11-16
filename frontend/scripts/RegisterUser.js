const usernameInput = document.getElementById('usernameInput');
const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');
const passAgainInput = document.getElementById('passAgainInput');
const singUpBtn = document.getElementById('SingUpBtn');
const iPadd = "http://127.0.0.1:8080";
const imagenExit = document.getElementById("exit");

imagenExit.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});
singUpBtn.addEventListener('click', sendUser);

async function createUser(data){ 
    let auth = localStorage.getItem("Authorization");
    let response = await fetch(iPadd+'/user/register',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : auth
        },
        body:data
    });
    
    let json = await response.json(); 
    console.log(json);
}

async function sendUser(){
    if(passInput.value==passAgainInput.value){
        var pass = passInput.value;
    }else{
        window.location.reload();
    }

    let username = usernameInput.value;
    let email = emailInput.value;
    

    let userDTO = {
        n : username, 
        e : email, 
        p : pass
    }

    let json = JSON.stringify(userDTO);
    console.log(json);
    await createUser(json); 
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
    if (user.r===2){
        window.location.href="../Menu.html"
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
        window.location.href="../Menu.html"
    } 
    
    return true;
}

