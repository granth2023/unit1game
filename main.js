//need array, create div element to hold cards called container, run through array holding cards, and *append* the cards 
//  const cardContainer = document.createElement('div');
// cardContainer.classList.add('card-container');
// document.body.append(cardContainer)
//run a for each through the array that is holding the cards , and going through each card and create a div for each for each card and append to the screen. 




const startBTN = document.getElementsByClassName("overlay-welcome");
const startBTN2 = document.getElementById('startbutton');
startBTN.onclick = function (){
    startBTN.style.display = 'none';
}
startBTN2.onclick = function (){
    startBTN2.style.display = 'none';
}



//create to hold entirety of the game. We need to create a parameter to refer to all the pieces of the game which is CARDS. We have a memory game and it is won via getting all the cards correct so we need to call all of them, cards Array. We want to track how many flips a player uses. This is a ticker and it gets assigned to the id flips. we also need the cards shuffled at the beginning. We also need to have an array for the matched cards which we will later compare to cards array. 

//this class holds the start game function which resets the board, the function to check if a card can even be flipped, the function for when a card is flipped, how to check for a match, then the function where to go if there has been a match, and a function if there hasn't been a match, how to call on the html to make sure the files stirngs match, the function for if there is a victory, and to shuffle cards

class MixorMatch {
    constructor(cards){
        this.cardsArray = cards;
        this.ticker = document.getElementById('flips');
        this.totalClicks = 0;
        
        //timer
        this.shuffleCards();
        this.matchedCards = [];     
    }
   
// when we start the game we set card to check to null which means we are not checking anything and the busy to false which means nothing is in the way from checking any of the cards. Insert action page. at the top.        
 

    


startGame(){
        this.cardToCheck =null;
        this.busy =false;   
        this.hideCards();
        this.ticker.innerText = this.totalClicks
    }

//after a card is has been selected and is now visible we want a function to return it to not being visible. This can happen to any card. !!!!!!!!When does it know two have been selected? !!!!!!!! so this does a for each method on the entirety fo the cards and removes visible and removes it from being matched if it doesn't have a match.

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

    //so when  a card CAN be flipped, and it is, the total for the clicks goes up, the card becoems visible and then if if it is the second card, the two get sent to check card for match, else it becomes card to check and another card has to be flipped 

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

    

//why are things after the fact? cause of the class? like why are we defining card typ after we've used it above? anyway, we get the card type by passing through the card and getting the class name and checking the src? to see if it's equal? game over really doesn't matter without at imer. it would have the secon dhave of reload btn stuff too. 

    getCardType(card){
        return card.getElementsByClassName('card-value')[0].src;

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

//array from creates an array from whatever we are calling. So Overlay Text is somehow tied to everything but card is now an array and for each of them it creates when you click it, it's going to flip the card 

//ready funciton does 3 things: creates an array of all my cards, takes my array and uses them in a new class to initiate a start game function and it's going to attach an event listener to each of the cardthat allows them to operate the flip card function. 

function ready() {


    //let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
   

     let game = new MixorMatch(cards);
     game.startGame();

   // overlays.forEach(overlay => {
     //   overlay.addEventListener('click', () => {
       //     overlay.classList.remove('visible');
         
       // });
   // });
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
//     //flexbox: left to right, row and wrap, flex made for uniformity DOM ELEMENT, CREATE ELEMENTS AND THEN ADD FUNCTIONS WITH BUTTONS AND HANDLE CLICK AND MAP IT INTO EACH DIV, EVERY IMAGE INTO A BUTTON//need map to put on the screen
//     //then a handle click function and a button on each one to allow for a swithc, create a butotn with each div and can switch 
//     //attach ID or class to make it changeable so that a single class has a ternary operator to flip and keep it flipped 

//     //create json, loop through it, append each onto html -- for every image class, create a json file, 
    
// ]