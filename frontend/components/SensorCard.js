class SensorCard {

    constructor(sensor) {
        this.sensor=sensor;
    }
    

    render() {
        let container = document.createElement('div'); //<div></div>
        container.classList.add('card');
        container.classList.add('sensorcard');

        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.setAttribute('src', 'https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-61851.jpg');

        let cardbody = document.createElement('div');
        cardbody.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');

        let description = document.createElement('p');
        description.classList.add('card-text');
        description.innerHTML = ("Lugar: " +this.sensor.location + " Tipo:" + this.sensor.type +" Estado:" +this.sensor.status);

        let button = document.createElement('a');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('href', '#');
        button.innerHTML = 'Cambiar estado';


        cardbody.appendChild(title);
        cardbody.appendChild(description);
        cardbody.appendChild(button);
        container.appendChild(img);
        container.appendChild(cardbody);

        //2. Poner informacion del componente
        title.innerHTML = this.sensor.name;

        //3. Acciones del componente
        button.addEventListener('click', this.sendSensor.bind(this))

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
            type: this.sensor.type,
            reference: this.sensor.reference,
            location: this.sensor.location,
            status: this.sensor.status
        };
        let json = JSON.stringify(sensorDTO);
        console.log(json);
        this.changeStatus(json);

    }


}