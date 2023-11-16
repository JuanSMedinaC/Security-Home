class CameraCard {

    constructor(cam) {
        this.cam = cam;
    }
    render() {
        let container = document.createElement('div'); //<div></div>
        container.classList.add('card');
        container.classList.add('cameraCard');

        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.setAttribute('src', 'https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-61851.jpg');

        let cardbody = document.createElement('div');
        cardbody.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');

        let description = document.createElement('p');
        description.classList.add('card-text');
        description.innerHTML = (this.alarm.location + " " + this.alarm.type);

        let button = document.createElement('a');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('href', '#');
        button.innerHTML = 'Change Status';


        cardbody.appendChild(title);
        cardbody.appendChild(description);
        cardbody.appendChild(button);
        container.appendChild(img);
        container.appendChild(cardbody);

        //2. Poner informacion del componente
        title.innerHTML = this.alarm.name;

        //3. Acciones del componente
        button.addEventListener('click', this.sendAlarm.bind(this))

        return container;
    }

    async changeStatus(data) {
        var parse = JSON.parse(window.localStorage.getItem('Authorization'));
        let response = await fetch("http://localhost:8080/alarm/update", {
            method: 'PUT',
            headers: {
                "Authorization": parse.id,
                "Content-Type": "application/json"
            },
            body: data,
            redirect: 'follow'
        });
            
    }

    async sendAlarm(event) {
        event.preventDefault();
        let alarmDTO = {
            name: this.alarm.name,
            type: this.alarm.type,
            reference: this.alarm.reference,
            location: this.alarm.location,
            status: this.alarm.status
        };
        let json = JSON.stringify(alarmDTO);
        console.log(json);
        this.changeStatus(json);

    }


}