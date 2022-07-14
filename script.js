// função de tempo para completar o jogo

function mode(){
   lockBoard = true;
   let facil = document.createElement("button");
   facil.textContent = "Fácil";
   facil.setAttribute("onclick", "timer(3)");
   facil.setAttribute("class", "button");

   let medio = document.createElement("button");
   medio.textContent = "Médio";
   medio.setAttribute("onclick", "timer(2)");
   medio.setAttribute("class", "button");

   let dificil = document.createElement("button");
   dificil.textContent = "Difícil";
   dificil.setAttribute("onclick", "timer(1)");
   dificil.setAttribute("class", "button");
   
   
   let divMode = document.getElementById('mode');
   divMode.innerText = "Escolha a dificuldade";
   divMode.appendChild(facil);
   divMode.appendChild(medio);
   divMode.appendChild(dificil);
}

function timer(minutes){
   lockBoard = false;
  document.getElementById('mode').style.display = "none";  

  let seconds = 0;

  let interval = setInterval(function(){
    seconds = seconds - 1;
    if(seconds < 0){
      seconds = 59;
      minutes = minutes - 1;
    }
  if(minutes < 0){
    clearInterval(interval);
     alert("O tempo acabou!");
     document.location.reload(true);
  }
    document.getElementById('timer').innerText = "Tempo: " + minutes + ":" + seconds;
  }, 1000);

}

function checkWinning(){
   let win = true;

   cards.forEach((card) => {
        if(!card.classList.contains('flip'))
           win = false;
   })

   if(win){
      alert("Você venceu!");
      document.location.reload(true);
   }
}

const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();

    checkWinning();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});