
const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
let firstCard = '';
let secondCard ='';



//Função que muda tema da página 
const html = document.querySelector('body')
const chk = document.querySelector('.chk')



const currentTheme = localStorage.getItem('theme');
if (currentTheme == 'dark') {
    document.body.classList.add('dark-mode');
}

chk.addEventListener('change',function() {
    html.classList.toggle('dark-mode')

    let theme = 'ligth';
    if (document.body.classList.add('dark-mode')){
        theme = 'dark'
    }   

    localStorage.setItem("theme", theme);
})




//Criando várias cartas 
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

    if (disabledCards.length == 16) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
      }

};

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

//cronometro do jogo
const stopWatch = document.querySelector('#timer');
let seconds = 0;
let minutes = 0;
let interval;

function startTime () {
    watch();
    interval = setInterval (watch,1000);
}

const digitZero = (digit) => {
    if (digit < 10) {
        return `0${digit}`;
    } return digit
}

function watch() {
    seconds ++;

    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    stopWatch.innerHTML = digitZero (minutes) + ':' + digitZero(seconds);

}



//Carregar jogo
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime();
    loadGame();
};

