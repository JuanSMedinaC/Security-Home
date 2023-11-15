const actPass = document.getElementById("actPass");
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");
const iPadd = "http://127.0.0.1:8080"

cancelButton.addEventListener("click",function(){
    window.location.href="Account.html"
})

submitButton.addEventListener("click",createObject)

function createObject(){  
    let actualPass=actPass.value;
    let password = {
        pass: actualPass
    };
    let json = JSON.stringify(password);
    console.log(json);
    deleteAccount(json);
}

async function deleteAccount(data){
    let user=localStorage.getItem("Authorization");
    user = JSON.parse(user);
    try{
        var auth = user.id
    }catch (error){
        window.location.href="../VistaUsuario.html"
    }
    
    await fetch(iPadd+'/user/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Authorization': auth
        },
        body: data
    }).then(res => {
        if (res.status==200){
            window.location.href="../VistaUsuario.html"
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
