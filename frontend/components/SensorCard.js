class SensorCard {

    constructor(sensor) {
        this.sensor = sensor;
    }
    render() {
        let container = document.createElement('div');
        container.classList.add('card');
        container.classList.add('border-primary');
        container.classList.add('mb-3');
        container.style.maxWidth = '24rem';

        // Crear el encabezado de la tarjeta
        let cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.innerHTML = ("Nombre: "+this.sensor.name);

        // Crear el cuerpo de la tarjeta
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.classList.add('text-primary');

        // Crear el título de la tarjeta
        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');

        // Crear el párrafo de la tarjeta
        let cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerHTML = ("Location: "+this.sensor.location +" . Estado: "+this.cam.status+ ". ");

        let button = document.createElement('a');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('href', '#');
        button.innerHTML = 'Cambiar estado';

        // Agregar elementos al cuerpo de la tarjeta
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(button);

        // Agregar elementos al contenedor principal
        container.appendChild(cardHeader);
        container.appendChild(cardBody);

        button.addEventListener('click', this.sendSensor.bind(this))

        container.style.marginLeft = '500px';
        container.style.backgroundColor = '#CDCDCD';

        // Devolver el contenedor principal
        return container;
    }

    async changeStatus(data) {
        var parse = JSON.parse(window.localStorage.getItem('Authorization'));
        let response = await fetch("http://localhost:8080/sensor/update", {
            method: 'PUT',
            headers: {
                "Authorization": parse.id,
                "Content-Type": "application/json"
            },
            body: data,
            redirect: 'follow'
        });

        if(response.status === 200){
            window.location.href="../gestionS.html"
        }else{
            switch (response.status) {
                case 404:
                    alert("Sensor not found");
                    break;
                case 403:
                    alert("You do not have authorization");
                    break;
                default:
                    alert("Error");
                    break;
            }
        }     
    }

    async sendSensor(event) {
        event.preventDefault();
        let sensorDTO = {
            name: this.sensor.name,
            location: this.sensor.location,
            status: this.sensor.status
        };
        let json = JSON.stringify(sensorDTO);
        console.log(json);
        this.changeStatus(json);
    }
}