//Variáveis 
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
let firstCard = '';
let secondCard ='';

let theme = document.querySelector('body');
let checkbox = document.querySelector('.checkbox');
const pause = document.querySelector('#pause-button')
const stopWatch = document.querySelector('#timer');
const retomar = document.querySelector('#pause');
const fimDeJogo = document.querySelector('.containerEnd');
const replayBt = document.querySelector('#replayBt');
const inicio = document.querySelector('#inicioBt');
const about = document.querySelector('#aboutBt');
let seconds = 0;
let minutes = 0;
let interval;



//TIMER ==== cronometro do jogo

function startTime () {
    watch();
    interval = setInterval (watch,1000);
}
    //Formatação de zeros
const digitZero = (digit) => {
    if (digit < 10) {
        return `0${digit}`;
    } return digit
}
    //Formatação do relógio
function watch() {
    seconds ++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    stopWatch.innerHTML = digitZero (minutes) + ':' + digitZero(seconds);
}
    //Botão pause
 pause.addEventListener ('click',() =>{
    var alert = document.querySelector('.container');
    clearInterval(interval);
    alert.style.display="block";
    pause.style.display="none";


    })
retomar.addEventListener('click',()=>{
    startTime()
    var alert = document.querySelector('.container');
    alert.style.display='none'
    pause.style.display="block";
})  



//DARK MODE - Busca tema salvo no localStorage
let themeOption = localStorage.getItem('Theme');
if (themeOption === 'dark'){
    theme.classList.toggle('dark-mode')
    ativarCheckbox(checkbox)
}
    //Check no checkbox 
function ativarCheckbox(check) {
    check.checked = true;
}
    //insere a classe dark-mode na tag body
checkbox.addEventListener('click', () => {
    theme.classList.toggle('dark-mode');
    //salva opção escolhida no localStorage 
    if(!theme.classList.contains('dark-mode')) {
        return localStorage.setItem('Theme', 'light');
                

    }  return localStorage.setItem('Theme', 'dark')             

});


//GAME = Criando várias cartas 
const character = [
    'alci01',
    'alci02',
    'alci03',
    'alci04',
];

//Função auxiliar para criar elemento 
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

//Função de fim de jogo
const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length == 8) {
        clearInterval(interval);
        fimDeJogo.style.display='block';
        pause.style.display="none";
    }

};
    //Botão replay
replayBt.onclick = function () {
    window.location.reload(true)
}
    //Botão Inicio
inicioBt.onclick = function (){
    window.location.href = 'index.html'
 }   





//Verificação de atributos identicos entre cartas
const checkCards = () => {
    const firstCharacter= firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';
        checkEndGame();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            //reatribuindo valor vazio para variaveis
            firstCard = '';
            secondCard = '';

        }, 600);
        
    }
};

//Função para revelar carta
const revealCard = ({target}) => {
    //Condição para virar carta
    if (target.parentNode.className.includes('reveal-card')){
        return;
    }
    //condição para armazenar e validar cartas viradas
    if (firstCard === ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

    target.parentNode.classList.add('reveal-card');
};

//Função que cria uma carta
const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement ('div', 'face front');
    const back = createElement ('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    card.setAttribute('data-character', character);

    return card;

};

//Função para carregar jogo
const loadGame = () => {
    //Duplica cartas 
    const duplicateCharacters = [...character, ...character];
    //Embaralha cartas
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
    //Cria cartas
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);         
    });
};


//Carregar jogo
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime();
    loadGame();
};

