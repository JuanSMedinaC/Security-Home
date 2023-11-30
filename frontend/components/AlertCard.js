class AlertCard {

    constructor(alert) {
        this.alert = alert;
    }
    
    render() {
        let container = document.createElement('div'); //<div></div>
        container.classList.add('card');
        container.classList.add('border-primary');
        container.classList.add('mb-3');

        // Crear el encabezado de la tarjeta
        let cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.innerHTML = ("Locación: "+this.alert.location);

        // Crear el cuerpo de la tarjeta
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.classList.add('text-primary');

         // Crear el título de la tarjeta
         let cardTitle = document.createElement('h5');
         cardTitle.classList.add('card-title');

         // Crear la lista de la tarjeta
        let cardList = document.createElement('ul');
        cardList.classList.add('list-group');

        // Crear elementos de lista para la fecha y la descripción
        let fechaItem = document.createElement('li');
        fechaItem.classList.add('list-group-item');
        let fecha = new Date(this.alert.date);
        fechaItem.innerHTML = ("Fecha: " + fecha);

        let descItem = document.createElement('li');
        descItem.classList.add('list-group-item');
        descItem.innerHTML = ("Descripción: " + this.alert.description);

        let buttonE = document.createElement('a');
        buttonE.classList.add('btn');
        buttonE.classList.add('btn-primary');
        buttonE.setAttribute('href', '#');
        buttonE.innerHTML = 'Eliminar';

        cardBody.appendChild(cardTitle);
        cardList.appendChild(fechaItem);
        cardList.appendChild(descItem);
        cardBody.appendChild(cardList);
        cardBody.appendChild(buttonE);
        container.appendChild(cardHeader);
        container.appendChild(cardBody);


        buttonE.addEventListener('click', this.sendAction.bind(this))

        container.style.display = 'inline-block';
        container.style.marginRight = '10%';
        container.style.left = '13%';

        container.style.width = "24%";
        container.style.height = "auto";
        container.style.marginTop = '7%';

        return container;
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