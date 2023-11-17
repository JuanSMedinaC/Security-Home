class AlertCard {

    constructor(alert) {
        this.alert = alert;
    }
    
    render() {
        let container = document.createElement('div'); //<div></div>
        container.classList.add('card');
        container.classList.add('alertcard');

        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.setAttribute('src', 'https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-61851.jpg');

        let cardbody = document.createElement('div');
        cardbody.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');

        let description = document.createElement('p');
        description.classList.add('card-text');
        let fecha = new Date(this.alert.date)
        description.innerHTML = (fecha);

        let button = document.createElement('a');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('href', '#');
        button.innerHTML = 'Detalles';

        button.addEventListener('click', this.action.bind(this))

        let buttonE = document.createElement('a');
        buttonE.classList.add('btn');
        buttonE.classList.add('btn-primary');
        buttonE.setAttribute('href', '#');
        buttonE.innerHTML = 'Eliminar';

        cardbody.appendChild(title);
        cardbody.appendChild(description);
        cardbody.appendChild(button);
        cardbody.appendChild(buttonE);
        container.appendChild(img);
        container.appendChild(cardbody);

        //2. Poner informacion del componente
        title.innerHTML = this.alert.location;

        buttonE.addEventListener('click', this.sendAction.bind(this))

        container.style.marginLeft = '400px';
        container.style.height = "400px";
        container.style.width = "300px";
        container.style.marginTop = '15px';

        return container;
    }

    action(event) {
        event.preventDefault();
        alert(this.alert.description);
    }

    async sendAction(event) {
        event.preventDefault();
        console.log("aqui");
        let AlertDTO = {
            id: this.alert.id
        };
        let json = JSON.stringify(AlertDTO);
        console.log(json);
        this.deleteAction(json);

    }

    async deleteAction(data){
        console.log("entró")
        var parse = JSON.parse(window.localStorage.getItem('Authorization'));
        let response = await fetch('http://127.0.0.1:8080/delete/Evento/Historial', {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization' : parse.id
            },
            body: data
        });
        
        if(response.status === 200){
            alert("camera correctly deleted");
            window.location.href = "../historial.html";
        }else{
            switch (response.status) {
                case 404:
                    alert("not found");
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
}