const input= document.querySelector('.login_input');
const button= document.querySelector('.login_button');
const form = document.querySelector('.login-form');

const theme = document.querySelector('body');
let checkbox = document.querySelector('#chk');


//insere a classe dark-mode na tag body
checkbox.addEventListener('click', () => {
    theme.classList.toggle('dark-mode');

    //salva opção escolhida no localStorage 
    if(!theme.classList.contains('dark-mode')) {
        return localStorage.setItem('Theme', 'light');
                

    }  return localStorage.setItem('Theme', 'Dark'),
                changeCheckbox();

                

});

//busca tema no localStorage
let themeOption = localStorage.getItem('Theme');
if (themeOption === 'Dark'){
    theme.classList.toggle('dark-mode');
}

// altera estado do checkbox 
function changeCheckbox () {
    checkbox = true;
}








// Função que habilita botão para envio do form
function validateInput({ target }) {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '');
}

//Função que salva o nome do jogador no navegador e redireciona a navegação. 
const handleSubmit = (event) => {
    event.preventDefault();
    
    localStorage.setItem('player', input.value);
    window.location = './game.html';
}

//===============

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);