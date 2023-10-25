const usernameInput = document.getElementById('usernameInput');
const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');
const passAgainInput = document.getElementById('passAgainInput');
const singUpBtn = document.getElementById('SingUpBtn');

async function createUser(data){ 

    let response = await fetch('127.0.0.1/user/create',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:data
    });
    
    let json = await response.json(); 
    console.log(json);
}

async function sendUser(){

    let username = usernameInput.value;
    let email = emailInput.value;
    let pass = passInput.value;

    let userDTO = {
        nombreDeUsuario : username, 
        correoElectronico : email, 
        clave: pass
    }

    let json = JSON.stringify(userDTO);
    console.log(json);
    await createUser(json); 
}

singUpBtn.addEventListener('click', sendUser);