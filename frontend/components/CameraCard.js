class CameraCard {

    constructor(cam) {
        this.cam = cam;
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
        cardHeader.innerHTML = ("Nombre: "+this.cam.name);

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
        cardText.innerHTML = ("Descripción: "+this.cam.description + ". Estado: "+this.cam.status + ".");


        let button = document.createElement('a');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('href', '#');
        button.innerHTML = 'Cambiar estado';

        let cardLink = document.createElement('a');
        cardLink.classList.add('btn');
        cardLink.classList.add('btn-success');
        cardLink.innerHTML = 'Enlace';
        cardLink.href = 'http://'+ this.cam.url; 

        // Agregar elementos al cuerpo de la tarjeta
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(button);
        // Agregar un espacio entre los botones
        let space = document.createElement('div');
        space.style.marginTop = '10px'; // Ajusta la cantidad de espacio según tus preferencias
        cardBody.appendChild(space);
        if (this.cam.status==="Activo"){
            cardBody.appendChild(cardLink);
        }
        // Agregar elementos al contenedor principal
        container.appendChild(cardHeader);
        container.appendChild(cardBody);

        button.addEventListener('click', this.sendCamera.bind(this))

        container.style.marginLeft = '300px';
        container.style.backgroundColor = '#CDCDCD';
        container.style.marginTop = '15px';

        // Devolver el contenedor principal
        return container;
    }

    async changeStatus(data) {
        var parse = JSON.parse(window.localStorage.getItem('Authorization'));
        let response = await fetch("http://localhost:8080/camera/update/status", {
            method: 'PUT',
            headers: {
                "Authorization": parse.id,
                "Content-Type": "application/json"
            },
            body: data,
            redirect: 'follow'
        });

        if(response.status === 200){
            window.location.href="../CamerasAll.html"
        }else{
            switch (response.status) {
                case 404:
                    alert("Camera not found");
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

    async sendCamera(event) {
        event.preventDefault();
        let cameraDTO = {
            name: this.cam.name,
            description: this.cam.description,
            status: this.cam.status
        };
        let json = JSON.stringify(cameraDTO);
        console.log(json);
        this.changeStatus(json);
    }
}