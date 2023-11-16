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
        description.innerHTML = (this.alert.description + " " +fecha);


        cardbody.appendChild(title);
        cardbody.appendChild(description);
        container.appendChild(img);
        container.appendChild(cardbody);

        //2. Poner informacion del componente
        title.innerHTML = this.alert.location;

        return container;
    }


}