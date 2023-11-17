const referenceE= document.getElementById('reference');
const deleteBtn = document.getElementById('deleteBtn');
const iPadd = "http://127.0.0.1:8080"

deleteBtn.addEventListener('click', createObject);
var parse = JSON.parse(window.localStorage.getItem('Authorization'));

function createObject(event){
    event.preventDefault();
    let reference = referenceE.value;
    if (reference === '') {
        alert("Please complete all fields");
        return;
    }
    let sensorDTO = {
        reference: reference
    };
    let json = JSON.stringify(sensorDTO);
    console.log(json);
    deleteSensor(json);
}

async function deleteSensor(data){
    let auth = localStorage.getItem("Authorization");
    let response = await fetch(iPadd+'/sensor/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : parse.id
        },
        body: data
    });
    
    if(response.status === 200){
        window.location.href="../gestionS.html"
        alert("sensor correctly deleted");
    }else{
        switch (response.status) {
            case 404:
                alert("sensor not found");
                break;
            case 403:
                alert("You do not have authorization");
                break;
            default:
                alert("Error");
                break;
        }
    }

    let json = await response.json(); 
    console.log(json);
}

