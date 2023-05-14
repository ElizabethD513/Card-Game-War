/*•	For the final project you will be creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
o	You do not need to do anything special when there is a tie in a round.
•	Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include. 
o	You do not need to accept any user input, when you run your code, the entire game should play out instantly without any user input inside of your browser’s console.
The completed project should, when executed, do the following:
•	Deal 26 Cards to each Player from a Deck of 52 cards.
•	Iterate through the turns where each Player plays a Card.
•	The Player who played the higher card is awarded a point
o	Ties result in zero points for both Players
•	After all cards have been played, display the score and declare the winner.
•	Write a Unit Test using Mocha and Chai for at least one of the functions you write.*/


class Player{//the Player class is establishing an array to hold the cards in the player's hand
    constructor(){
      this.hand = []
    }

    addCard(card){//a function to add a card to the player's hand using .push
      this.hand.push(card)
    }
    
    playCard(){//a function to remove a card from the player's hand in order to play it using .shift
      let currentCard = this.hand.shift()
			return currentCard
    }
}

class Deck{//establishing the deck that is used in this game, with a function to shuffle the deck
    constructor(){
      let newDeck = this.buildDeck()
      newDeck = this.shuffleDeck(newDeck)
      this.cardArray = newDeck
    }

    buildDeck(){//a function to create the deck using suits and values (this was a pre-made method I googled to find and modified to add values to each card.)
      const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
      const values = [
        "Ace",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King",
      ];
      
      // empty array to contain cards
      let deck = [];
      
      // create a deck of cards
      for (let i = 0; i < suits.length; i++) {
          for (let x = 0; x < values.length; x++) {
            let faceValue = values[x];
            let value //used to hold the numerical value of each card to make it easier to determine who won each round
            if(faceValue === "Jack"){
              value = 11
            }
            else if(faceValue === "Queen"){
              value = 12
            }
            else if(faceValue === "King"){
              value = 13
            }
            else if(faceValue === "Ace"){
              value = 14 
            }
            else{
              value = Number(faceValue)
            }
            let card = {
                  faceValue: faceValue,
                  suit: suits[i],
                  value: value
              };
              deck.push(card);
          }
      }
      return deck
      
    }

    shuffleDeck(deck){//using a for loop with a randomizer to shuffle the deck 
      
      for (let i = deck.length - 1; i > 0; i--){ //i is being set to 51 because deck.length - 1 is 52 - 1
        let j = Math.floor(Math.random() * i);  //Math.floor rounds down, Math.random creates a random number between 0 and 1 and multiplies by i
        let tempCard = deck[i]; //starting at the last card in the deck I swap it with the random card in the deck until I've swapped all 52 cards
        deck[i] = deck[j];
        deck[j] = tempCard;
      }
      return deck
    }

}

class Game {//In the game class you start the game, deal the cards and play each round
  
  initGame(){ // I've set the player's scores to 0, instantiated a new deck, then I'm taking the new deck from the card array. I instatiated new players and deal cards to the players
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    let newDeck = new Deck()
    this.deck = newDeck.cardArray
    this.playerOne = new Player()
    this.playerTwo = new Player()
    this.dealCards()
  
  }
  dealCards(){ //this will deal cards to each player
    while (this.deck.length > 0) { //the loop will run until the deck runs out of cards
      let currentCard = this.deck.shift() //creating a variable to take a card from the beginning of the array
      if(this.deck.length % 2 === 1){ //if the deck has an odd length, playerOne gets the card, if the deck has an even length, playerTwo gets the card
       this.playerOne.addCard(currentCard)
      }
      else  {
        this.playerTwo.addCard(currentCard)
      }
    }
  }

  playRound(){//this function is adding a point to each winner per round played, if there is a tie no points are given.
    let playerOneCard = this.playerOne.playCard()
    let playerTwoCard = this.playerTwo.playCard()
    let whoWon = this.whoWonRound(playerOneCard, playerTwoCard)
    if(whoWon === 1){
      this.playerOneScore += 1
		}
		else if(whoWon === 2){
			this.playerTwoScore += 1
    }
    console.log(`playerOne played card ${playerOneCard.faceValue} of ${playerOneCard.suit}`) //printing each card this player plays
    console.log(`playerTwo played card ${playerTwoCard.faceValue} of ${playerTwoCard.suit}`)
    console.log(`Player one has ${this.playerOneScore} points, Player two has ${this.playerTwoScore} points`) //printing to the console each player's score
  }

  whoWonRound(cardOne, cardTwo){//a function that returns a number using if statements determining who wins each round
    if(cardOne.value > cardTwo.value){
      return 1
    }
    if(cardOne.value < cardTwo.value){
      return 2
    }
     
    return 0//this means there is a tie and no one wins
  }
  playGame(){//a function with a while loop and if/else statement to show which player wins, printing to the console
    while (this.playerOne.hand.length > 0) { //while the player has a card in their hand, they'll play that round
      this.playRound()
    
    }
    if(this.playerOneScore > this.playerTwoScore){  
      console.log("Player one wins")
     }
     else if(this.playerTwoScore > this.playerTwoScore) {
      console.log("Player two wins")

     }
     else {
      console.log("The game ends in a tie")
     }
  }

}
let warGame = new Game() //instatiates a new game
warGame.initGame() //this is laying the groundwork for a new game
warGame.playGame() //this is playing the game




   
    
    
  
