class UserCard{

    constructor(alarm){
        this.alarm = alarm;
    }

    render(){
        let container = document.createElement('div'); //<div></div>
        container.classList.add('card');
        container.classList.add('domicard');

        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.setAttribute('src', 'https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-61851.jpg');

        let cardbody = document.createElement('div');
        cardbody.classList.add('card-body');

        let title = document.createElement('h5');
        title.classList.add('card-title');

        let description = document.createElement('p');
        description.classList.add('card-text');
        description.innerHTML = "De click sobre el botón para obtener más información";
        
        let button = document.createElement('a');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.setAttribute('href','#');
        button.innerHTML= 'More';


        cardbody.appendChild(title);
        cardbody.appendChild(description);
        cardbody.appendChild(button);
        container.appendChild(img);
        container.appendChild(cardbody);

        //2. Poner informacion del componente
        title.innerHTML = this.user.username;
        
        //3. Acciones del componente
        button.addEventListener('click', this.action.bind(this))

        return container;
    }

    action(event){
        event.preventDefault();
        alert(this.user.username);
        window.localStorage.setItem('userClicked', JSON.stringify(this.user));
        window.location.href = '/userDetail.html';
    }


}