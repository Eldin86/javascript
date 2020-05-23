/*
GAME RULES: 
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each results get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUDN score get lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score.
  After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/


/*
YOUR CHALLANGES 
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's next player's turn
  (HINT: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the
  predefined score of 100 (HINT: you can read that value with .value property in javascript. This is a
  good oportunity to use google to figure this out)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when
  one of them is a 1 (HINT: you will need CSS to position the second dice, so take a look at the CSS
    code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, prevValue = 0, customValue;
init();


//Roll dice button event listener 
document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    document.querySelector('.dice').style.display = 'block';
    diceDOM.src = 'images/dice-' + dice + '.png'

    //3. Update the round score IF the rolled number was NOT a 1
    //Ako je kocka razlicito od jedan dodaji na roundScore i update rezultat u view
    if (dice !== 1) {

      //Check if user roll 2 times in a row number 6
      if(prevValue === dice && dice === 6 ){
        console.log(prevValue, dice);
        nextPlayer();
      }
      prevValue = dice;


      //Add score
      roundScore += dice;
      //defaultno je player sa ID broj 0
      document.querySelector('#current-' + activePlayer).textContent = roundScore
    } else {
      //Next player
      nextPlayer();
    }
  }
})

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    //Add CURRENT score to GLOBAL score
    //Spremamo u score niz u index ovisno koji je igrac aktivan
    scores[activePlayer] += roundScore
    console.log(scores[activePlayer])

    //Update UI
    //dohvatili smo ID sa score- ovisno o igracu koji je aktivan
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Get input value
    customValue = document.querySelector('.input_value').value;

    //Check if player won the game
    //Ako player ima vise od 10 bodova ispisi WINNER, ukloni sliku kockice, dodaj klasu winner i ukloni klasu active
    if (scores[activePlayer] >= setWinNumber(customValue)) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!'
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
})

//Switch to next player
function nextPlayer() {
  //switchaj playera
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  //Ovisno od active playera na koji smo switchali postavlja se vrijednost 0
  //Oba zbira u current-0 i current-1 postavljamo na 0
  document.getElementById('current-0').textContent = '0'
  document.getElementById('current-1').textContent = '0'

  document.querySelector('.player-0-panel').classList.toggle('active')
  document.querySelector('.player-1-panel').classList.toggle('active')

  //Add/remove active class
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
}

//Da ne bismo pisali anonimnu funkciju pozovali smo samo init funkciju
document.querySelector('.btn-new').addEventListener('click', init)

//Reset to initial state
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  //Postavljamo css style - dice na none kao defaultno
  document.querySelector('.dice').style.display = 'none';

  //Dohvacamo id
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-1').textContent = 'Player 1'
  document.getElementById('name-0').textContent = 'Player 2'

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');

  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function setWinNumber(number = 10){
  return number;
}

//----------------------------------------------
/*
dice = Math.floor(Math.random()*6)+1;
console.log(dice)
*/
//-----------------------------------------------
//Query selector uzima samo prvi element koji nadje, i dohvacamo elemente kao i u css-u
/*
1. Razlika izmedju innerHTML i textContent (textContent samo moze da postavi cisti text, ne HTML,
  Ako zelimo da koristimo HTML koristimo innerHTML, koji mora biti string)
*/
//document.querySelector('#current-' + activePlayer).textContent = dice
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'


















// var myAlerts = [];

// //var i, let i se razlicito ponasaju u petlji

// for (let i = 0; i < 5; i++) {
//     myAlerts.push(
//         function inner() {
//             alert(i);
//         }
//     );
// }

// myAlerts[0](); // 5

// myAlerts[1](); // 5

// myAlerts[2](); // 5

// myAlerts[3](); // 5

// myAlerts[4](); // 5

//This keyword (self)
// var obj = {
//     name: 'Obj',
//     someMethod: function() {
//    console.log(this)
//     var self = this;
//       function someFunction() {
//         console.log(self);
//       }

//       someFunction();  // Window object

//     }
//   }

//   obj.someMethod();