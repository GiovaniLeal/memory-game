let theme = document.querySelector('body');
let checkbox = document.querySelector('.checkbox');


//insere a classe dark-mode na tag body
checkbox.addEventListener('click', () => {
    theme.classList.toggle('dark-mode');

    //salva opção escolhida no localStorage 
    if(!theme.classList.contains('dark-mode')) {
        return localStorage.setItem('Theme', 'light');
                

    }  return localStorage.setItem('Theme', 'dark')             

});


//Tema salvo no localStorage
let themeOption = localStorage.getItem('Theme');
if (themeOption === 'dark'){
    theme.classList.toggle('dark-mode')
    ativarCheckbox(checkbox)
}

//Check no checkbox 
function ativarCheckbox(check) {
    check.checked = true;
}

;