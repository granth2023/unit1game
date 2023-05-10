

class MixorMatch {
    constructor(cards){
        this.cardsArray = cards;
        this.ticker = document.getElementById('flips');
        this.totalClicks = 0;
        //timer
        this.shuffleCards();
        this.matchedCards = [];
    
    }
    
startGame(){
        this.cardToCheck =null;
       
        this.busy =false;
        
    }
hideCards(){
        this.cardsArray.forEach(card=> {
            card.classList.remove('visible');
            card.classList.remove('matched');
        });
    }
canFlipCard(card) {
        return ((!this.busy) && !this.matchedCards.includes(card) && card !== this.cardToCheck);
    }
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

    checkForCardMatch(card){
        if(this.getCardType(card)===this.getCardType(this.cardToCheck))
            this.cardMatch(card, this.cardToCheck);
        else
            this.cardMisMatch(card, this.cardToCheck);

    this.cardToCheck = null; 
} 

    getCardType(card){
        return card.getElementsByClassName('card-value')[0].src;

    }
    gameOver(){
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        document.getElementById('victory-text').classList.add('visible')  
        document.getElementsByClassName('overlay-text-small').addEventListener('click', function(){
            window.location.reload();
            return false; 
        })
        
    }
    
    shuffleCards() {
            for(let i = this.cardsArray.length -1; i >0; i--){
                let randIndex = Math.floor(Math.random() * (i+1)); 
                this.cardsArray[randIndex].style.order= i;
                this.cardsArray[i].style.order = randIndex;
            }
        }
    
       // resetGame() {
    //         this.shuffleCards();
    //         this.hideCards();
    //         this.totalClicks = 0;
    //         document.getElementById('victory-text').classList.remove('visible');
    //         document.getElementById('game-over-text').classList.remove('visible');
    //         this.matchedCards = [];
            
    //             // Code to execute when the element is clicked
    //                   // RESET
    //     this.cardsArray = cards;
    //     this.totalClicks = 0;
    //     this.shuffleCards();
    //     this.matchedCards = [];
    //     this.startGame();
    //     }

}



function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));

     let game = new MixorMatch(cards);

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


// const cardData = [
//     {
//         "frontside":"newmatriximage.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"newmatriximage.png",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"newfugitive.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"newfugitive.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"newindiana.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"newindiana.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"newheat.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"newheat.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"newmission.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"newmission.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"tenet.jpeg",
//         "backside":"reel.png"
//     },
//     {
//         "frontside":"tenet.jpeg",
//         "backside":"reel.png"
//     },
// ]
//     //flexbox: left to right, row and wrap, flex made for uniformity DOM ELEMENT, CREATE ELEMENTS AND THEN ADD FUNCTIONS WITH BUTTONS AND HANDLE CLICK AND MAP IT INTO EACH DIV, EVERY IMAGE INTO A BUTTON//need map to put on the screen
//     //then a handle click function and a button on each one to allow for a swithc, create a butotn with each div and can switch 
//     //attach ID or class to make it changeable so that a single class has a ternary operator to flip and keep it flipped 

//     //create json, loop through it, append each onto html -- for every image class, create a json file, 
    
// ]