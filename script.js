'use strict';


// getElementById> querySelector ---> is faster but that is relative when you are selecting 1000 of the lines of codes  

const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');
const score0El=document.querySelector('#score--0');

const score1El=document.getElementById('score--1');

const diceEl =document.querySelector('.dice');

const current0El=document.querySelector('#current--0');
const current1El=document.querySelector('#current--1')

//Starting Condition

// console.log(score0El,score1El)



const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

let score, activePlayer,currScore,playing;

const init=function(){
     score=[0,0];
     activePlayer=0;
     currScore=0;
     playing=true;

    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;

    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active')
diceEl.classList.add('hidden')

};

init();

const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
        currScore=0;
        activePlayer=activePlayer==0?1:0;
        //If force is not given, "toggles" token, removing it if it's present and adding it if it's not present. If force is true, adds token (same as add()). If force is false, removes token (same as remove()).
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

}

//Rolling dice functionality 

btnRoll.addEventListener('click',function(){
    if(playing){
    //1. Generating a randmo dice roll 
    const dice=Math.trunc(Math.random()*6)+1;
    //2. Display Dice
        // console.log(dice);
        diceEl.classList.remove('hidden');
        diceEl.src =`dice-${dice}.png`

    if(dice!==1){
        currScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent=currScore;
    }
    else{
        //3. Check for rolled 1: if true, switch to nexts player
        switchPlayer();
    }
}
})

btnHold.addEventListener('click',function(){
    if(playing){
    //1. Add current score to active player's score
    score[activePlayer]+=currScore;
    document.getElementById(`score--${activePlayer}`).textContent=score[activePlayer];
    //2. check if player's score is >=100
    if(score[activePlayer]>=100){
        //finish the game
        playing =false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    }
else

    //swtich to the next player
    switchPlayer();
}})


btnNew.addEventListener('click',init)