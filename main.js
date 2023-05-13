
const startBTN = document.getElementsByClassName("overlay-welcome");
const startBTN2 = document.getElementById('startbutton');

//this class holds the start game function which resets the board, the function to check if a card can even be flipped, the function for when a card is flipped, how to check for a match, then the function where to go if there has been a match, and a function if there hasn't been a match, how to call on the html to make sure the files stirngs match, the function for if there is a victory, and to shuffle cards

class MixorMatch {
    constructor(totalTime, cards){
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
        this.totalClicks = 0;
        this.matchedCards = [];   
        const restartbttn = document.getElementById('restart');

    restartbttn.addEventListener('click', () => {
    location.reload();
})  
    }
   
// when we start the game we set card to check to null which means we are not checking anything and the busy to false which means nothing is in the way from checking any of the cards. Insert action page. at the top.        

startGame(){
    this.cardToCheck =null;
    this.ticker.innerText = this.totalClicks
    this.shuffleCards();
    this.busy = false;
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    const startBTN2 = document.getElementById('startbutton');
    startBTN2.onclick = () => {
        this.countDown = this.startCountDown();
        startBTN2.style.display = 'none';
    }
  
}

//after a card is has been selected and is now visible we want a function to return it to not being visible. This can happen to any card. !!!!!!!!When does it know two have been selected? !!!!!!!! so this does a for each method on the entirety fo the cards and removes visible and removes it from being matched if it doesn't have a match.

hideCards(){
        this.cardsArray.forEach(card=> {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }

canFlipCard(card) {
        return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
    }
    //when a card is flipped, we want the function to have some options so we set up some conditionals. if the card is flipped, no matter what it gets added to the total clicks counter and the card becomes visible. if it is a card to check meaning we can check it, then we see if it is matched, otherwise it just reamins as a card

    //so when  a card CAN be flipped, and it is, the total for the clicks goes up, the card becoems visible and then if if it is the second card, the two get sent to check card for match, else it becomes card to check and another card has to be flipped 

flipCard(card){
    if(this.canFlipCard(card)){
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
                card.classList.add('visible');
    
         if(this.cardToCheck)
                    this.checkForCardMatch(card);
                    
           else 
                        this.cardToCheck = card;
            }
    }
   
    //then for when a card is a match, we add the cards, 1 and 2 to the matchedCards array. we add them to matched classes. and if the array of matchedCards is equal to all the cards then bam initiate the vicotry function 

 checkForCardMatch(card){
        if(this.getCardType(card)===this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

    this.cardToCheck = null; 
 
} 
  cardMatch(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length=== this.cardsArray.length)
            this.victory();
    }
cardMisMatch(card1, card2){
        this.busy = true; 
            setTimeout(() => {
                card1.classList.remove('visible');
                card2.classList.remove('visible');
                this.busy=false;
                
            }, 1000);

    }
    //check for if they are a match we need to get the cardtype and see if what we clicked is matched by the second card we clicked which is the card to check. so then if they do equal then we initate cardMatch with the first card and the card to check. running card to check on the second card selected. the first card selected is just first card. otherwise we send both cards to mismatch and then reset the checking function back to null


    getCardType(card){
        return card.getElementsByClassName('card-value')[0].src;

    }
    startCountDown(){
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0) {
                this.gameOver();
            }
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countDown);
        document.getElementById('overlay-game-over').classList.add ('visible');
        const restart = document.getElementById("restart").classList.add('visible');
    }

    victory() {
        clearInterval(this.countDown);
        document.getElementById('victory-text').classList.add('visible') 
        const reloadBtn = document.getElementById("overlay-text-victory-small");
        reloadBtn.addEventListener('click',() => {
            location.reload();
            console.log('reload with clicked')
          });
    }  

    shuffleCards() {
            for(let i = this.cardsArray.length -1; i >0; i--){
                let randIndex = Math.floor(Math.random() * (i+1)); 
                this.cardsArray[randIndex].style.order= i;
                this.cardsArray[i].style.order = randIndex;
            }
        }
}

//array from. creates an array from whatever we are calling.

//ready funciton does 3 things: creates an array of all my cards, takes my array and uses them in a new class to initiate a start game function and it's going to attach an event listener to each of the cardthat allows them to operate the flip card function. 

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixorMatch(30, cards);
     game.startGame();

    overlays.forEach(overlay => {
       overlay.addEventListener('click', () => {
           overlay.classList.remove('visible');   
       });
   });
    cards.forEach(card=> {
        card.addEventListener('click', ()=> {
                game.flipCard(card);
        })
    })
}

//this is saying if the page is not ready upon going toward, then load ready when it is loaded, otherwise thne it is not still loading and ready can be intiliazed. 

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
