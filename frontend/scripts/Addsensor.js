const nameE= document.getElementById('name');
const typeE= document.getElementById('type');
const referenceE= document.getElementById('reference');
const locationE= document.getElementById('location');
const statusE = document.getElementById('status');
const addBtn = document.getElementById('addBtn');
const imagenExit = document.getElementById("logout");

imagenExit.addEventListener("click", function() {
  window.location.href = "VistaUsuario.html";
  window.localStorage.removeItem("Authorization");
});

addBtn.addEventListener('click', addSensor)

var parse = JSON.parse(window.localStorage.getItem('Authorization'));

async function createSensor(data){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch('http://127.0.0.1:8080/sensor/add', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : parse.id
        },
        body: data
    });
    
    if(response.status === 200){
        alert("Sensor correctly added");
        window.location.href="gestionS.html"
    }else{
        switch (response.status) {
            case 409:
                alert("Sensor was already created");
                break;
            case 403:
                alert("Couldn't be added a sensor correctly");
                break;
            default:
                alert("Error");
                break;
        }
    }

    let json = await response.json(); 
    console.log(json);
}

async function addSensor(event){
    event.preventDefault();
    let name = nameE.value;
    let type= typeE.value;
    let reference= referenceE.value;
    let location= locationE.value;
    let status = statusE.value;
    if (name === '' || type === '' || reference === '' || location === '' || status === '') {
        alert("Please complete all fields");
        return;
    }
    let sensorDTO = {
        name: name,
        type: type,
        reference: reference,
        location: location,
        status: status
    };
    let json = JSON.stringify(sensorDTO);
    console.log(json);
    await createSensor(json);
}

