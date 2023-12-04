class CameraCard {

    constructor(cam) {
        this.cam = cam;
    }
    render() {
        let container = document.createElement('div');
        container.classList.add('card');
        container.classList.add('border-info');
        container.classList.add('mb-3');
        container.style.backgroundColor = '#003EFF';

        let cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.style.fontWeight = 'bold'; 
        cardHeader.innerHTML = ("Nombre: "+this.cam.name);
        cardHeader.style.color = 'black';

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.classList.add('text-primary');
        cardBody.style.backgroundColor = 'black';

        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        
        let cardList = document.createElement('ul');
        cardList.classList.add('list-group');
        cardList.style.backgroundColor = 'lightblue';

        let description = document.createElement('li');
        description.classList.add('list-group-item');
        description.style.backgroundColor = 'black';
        description.style.color = 'white';
        description.innerHTML = ("Descripción: "+this.cam.description);

        let status = document.createElement('li');
        status.classList.add('list-group-item');
        status.style.backgroundColor = 'black';
        status.style.color = 'white';
        status.innerHTML = ("Estado: "+this.cam.status);

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

        cardBody.appendChild(cardTitle);
        cardList.appendChild(description);
        cardList.appendChild(status);
        cardBody.appendChild(cardList);
        cardBody.appendChild(button);

        let space = document.createElement('div');
        space.style.marginTop = '10px'; 
        cardBody.appendChild(space);
        if (this.cam.status==="Activo"){
            cardBody.appendChild(cardLink);
        }
        container.appendChild(cardHeader);
        container.appendChild(cardBody);

        button.addEventListener('click', this.sendCamera.bind(this))

        container.style.display = 'inline-block';
        container.style.marginRight = '10%';
        container.style.left = '12%';
    
        container.style.width = '24%';
        container.style.height = 'auto';
        container.style.marginTop = '7%';

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
                    alert("No fue encontrada la cámara");
                    break;
                case 403:
                    alert("No tienes autorización");
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