

//create to hold entirety of the game. We need to create a parameter to refer to all the pieces of the game which is CARDS. We have a memory game and it is won via getting all the cards correct so we need to call all of them, cards Array. We want to track how many flips a player uses. This is a ticker and it gets assigned to the id flips. we also need the cards shuffled at the beginning. We also need to have an array for the matched cards which we will later compare to cards array. 
class MixorMatch {
    constructor(cards){
        this.cardsArray = cards;
        this.ticker = document.getElementById('flips');
        this.totalClicks = 0;
        this.startButton = document.getElementById('start-game-btn');
        //timer
        this.shuffleCards();
        this.matchedCards = [];
    
        
       
        
    }
   
// when we start the game we set card to check to null which means we are not checking anything and the busy to false which means nothing is in the way from checking any of the cards. Insert action page. at the top.        

startGame(){
   
        this.cardToCheck =null;
       
        this.busy =false;
        
    }

//after a card is has been selected and is now visible we want a function to return it to not being visible. This can happen to any card. !!!!!!!!When does it know two have been selected? !!!!!!!! so this does a for each method on the entirety fo the cards and removes visible and removes it from being matched if it doesn't have a match.
setStartButtonClickListener() {
    this.startButton.addEventListener('click', () => {
      this.startGame();
      this.startButton.remove();
    });
  }

hideCards(){
        this.cardsArray.forEach(card=> {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
//create a function that prohibits turning the cards over and this mean if the game not in the middle of being a process??????????????/, if it's not a match already and if it's not the card already selected

canFlipCard(card) {
        return ((!this.busy) && !this.matchedCards.includes(card) && card !== this.cardToCheck);
    }
    //when a card is flipped, we want the function to have some options so we set up some conditionals. if the card is flipped, no matter what it gets added to the total clicks counter and the card becomes visible. if it is a card to check meaning we can check it, then we see if it is matched, otherwise it just reamins as a card -- not sure on this.cardToCheck = card

flipCard(card){
    if(this.canFlipCard(card)){
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
                card.classList.add('visible');
    
         if(this.cardToCheck)
                    this.checkForCardMatch(card);
                    //check for match
           else 
                        this.cardToCheck = card;
         
                //if statment
            }
    }
    //then for when a card is a match, we add the cards, 1 and 2 to the matchedCards array. we add them to matched classes. and if the array of matchedCards is equal to all the cards then bam initiate the vicotry function 

  cardMatch(card1, card2){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        if(this.matchedCards.length=== this.cardsArray.length)
            this.victory();
    }
//if the cards misMatch, 1 and 2, then we say the game is busy?????????/ we then create a timer function that removes the visiblity of both card and 1 and 2 and then wehen that completes the game is no longer busy. 

cardMisMatch(card1, card2){
        this.busy = true; 
            setTimeout(() => {
                card1.classList.remove('visible');
                card2.classList.remove('visible');
                this.busy=false;
                
            }, 1000);

    }
    //check for if they are a match we need to get the cardtype and see if what we clicked is matched by the second card we clicked which is the card to check. why no open bracket????????? so then if they do equal then we initate cardMatch with the first card and the card to check. so basiclaly i believe we are running card to check on the second card selected. the first card selected is just first card. otherwise we send both cards to mismatch and then reset the checking function back to null

    checkForCardMatch(card){
        if(this.getCardType(card)===this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

    this.cardToCheck = null; 
} 

//why are things after the fact? cause of the class? like why are we defining card typ after we've used it above? anyway, we get the card type by passing through the card and getting the class name and checking the src? to see if it's equal? game over really doesn't matter without at imer. it would have the secon dhave of reload btn stuff too. 

    getCardType(card){
        return card.getElementsByClassName('card-value')[0].src;

    }
    gameOver(){
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        document.getElementById('victory-text').classList.add('visible') 
        const reloadBtn = document.getElementById("overlay-text-victory-small");
        reloadBtn.addEventListener('click',() => {
            location.reload();
            console.log('reload with clicked')
          });
    }   
//got to shuffle them cards! so it's going to loop through the cards. we want to loop through them from top to bottom and we want to randomize them so we create random index and take all the cards array with a randomizer to change the order via style and set that to i so that puts each card so then the card array is set to itself with a randomization.

    shuffleCards() {
            for(let i = this.cardsArray.length -1; i >0; i--){
                let randIndex = Math.floor(Math.random() * (i+1)); 
                this.cardsArray[randIndex].style.order= i;
                this.cardsArray[i].style.order = randIndex;
            }
        }
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
   

     let game = new MixorMatch(cards);
            game.setStartButtonClickListener();

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });
    cards.forEach(card=> {
        card.addEventListener('click', ()=> {
                game.flipCard(card);
        })
    })
}

if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
//     //flexbox: left to right, row and wrap, flex made for uniformity DOM ELEMENT, CREATE ELEMENTS AND THEN ADD FUNCTIONS WITH BUTTONS AND HANDLE CLICK AND MAP IT INTO EACH DIV, EVERY IMAGE INTO A BUTTON//need map to put on the screen
//     //then a handle click function and a button on each one to allow for a swithc, create a butotn with each div and can switch 
//     //attach ID or class to make it changeable so that a single class has a ternary operator to flip and keep it flipped 

//     //create json, loop through it, append each onto html -- for every image class, create a json file, 
    
// ]