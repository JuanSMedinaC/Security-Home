const typesensorInput = document.getElementById('typesensorInput');
const locationInput = document.getElementById('locationInput');
const referenceInput = document.getElementById('referenceInput');

const addSensorBtn = document.getElementById('AddSensorBtn');

async function addSensor(data){ 

    let response = await fetch('127.0.0.1/sensor/add',{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:data
    });
    
    let json = await response.json(); 
    console.log(json);
}

async function sendSensor(){

    let typesensor = typesensorInput.value;
    let location = locationInput.value;
    let reference = referenceInput.value;

    let sensorDTO = {
        typeofsensor : typesensor, 
        locationofsensor : location, 
        referenceofsensor: reference
    }

    let json = JSON.stringify(sensorDTO);
    console.log(json);
    await addSensor(json); 
}

addSensorBtn.addEventListener('click', sendSensor);

