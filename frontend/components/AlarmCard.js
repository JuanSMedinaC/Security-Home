class AlarmCard {

    constructor(alarm) {
        this.alarm = alarm;
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
        cardHeader.innerHTML = ("Nombre: " + this.alarm.name);
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

        let location = document.createElement('li');
        location.classList.add('list-group-item');
        location.style.backgroundColor = 'black';
        location.style.color = 'white';
        location.innerHTML = ("Lugar: " +this.alarm.location);

        let typeItem = document.createElement('li');
        typeItem.classList.add('list-group-item');
        typeItem.style.backgroundColor = 'black';
        typeItem.style.color = 'white';
        typeItem.innerHTML = ("Tipo: "+this.alarm.type);

        let statusItem = document.createElement('li');
        statusItem.classList.add('list-group-item');
        statusItem.style.backgroundColor = 'black';
        statusItem.style.color = 'white';
        statusItem.innerHTML = ("Estado: " +this.alarm.status);

        let button = document.createElement('a');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('href', '#');
        button.innerHTML = 'Cambiar estado';


        cardBody.appendChild(cardTitle);
        cardList.appendChild(location);
        cardList.appendChild(typeItem);
        cardList.appendChild(statusItem);
        cardBody.appendChild(cardList);
        cardBody.appendChild(button);
        container.appendChild(cardHeader);
        container.appendChild(cardBody);

        button.addEventListener('click', this.sendAlarm.bind(this));

        container.style.display = 'inline-block';
        container.style.marginRight = '10%';
        container.style.left = '12%';
    
        container.style.width = '24%';
        container.style.height = 'auto';
        container.style.marginTop = '7%';

        return container;

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

        if(response.status === 200){
            window.location.href="../gestionA.html"
        }else{
            switch (response.status) {
                case 404:
                    alert("No fue encontrado");
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


}