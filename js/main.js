/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

// `Player` class
class Player {
  constructor(token){
  this.token = token;
  }
}

// Tic Tac Toe Game Class
class TicTacToe {
    constructor(){
        // New Player instances `this.player1` and `this.player2`
        // with properties that correspond to a Glyphicon icon name.
        this.player1 = new Player('heart');
        this.player2 = new Player('star');

        // Initialize values.
        this.currentPlayer = null;
        this.gameStatus = null;
        this.winner = null;
        this.moveCount = 0
        
        // Set up DOM elements used in game as Class properties.
        this.startPrompt = document.querySelector(`#start-prompt`);
        this.movePrompt = document.querySelector(`#move-prompt`);
        this.currentPlayerToken = document.querySelector(`#player-token`);
        this.gameboard = document.querySelector(`#gameboard`);
        this.winScreen = document.querySelector(`#win-screen`);
        this.winnerToken = document.querySelector(`#winner-token`);
        this.drawScreen = document.querySelector(`#draw-screen`);
        
        // Initialize an Array representing the starting state of the game board.
        // This is provided for you. We can access the spaces on the board using
        // (X, Y) coordinates as `this.gameState[x][y]`, which is how the game
        // will check to see if the winner is known.
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        // Array of Win States
        // This is provided for you. Each of these arrays represents the ways
        // a player can win Tic Tac Toe. Each item in the array is another
        // array. Each of those arrays contains a set of (X, Y) coordinates.
        // If a player has claimed the tile at each of the coordinates listed in
        // one of the win states, then they have won the game.
        this.winStates = [
          [[0,0],[0,1],[0,2]],
          [[1,0],[1,1],[1,2]],
          [[2,0],[2,1],[2,2]],
          [[0,0],[1,0],[2,0]],
          [[0,1],[1,1],[2,1]],
          [[0,2],[1,2],[2,2]],
          [[0,0],[1,1],[2,2]],
          [[0,2],[1,1],[2,0]]
        ];
    }

    // This `checkForWinner()` method is provided for you, but you must fill in
    // the event dispatch lines that cause the end game screens to show.
    checkForWinner(){
      console.log('Checking for Winner.');
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;

                // If a win, `winEvent` dispatches the signal "win".
                let winEvent = new Event('win');
                document. dispatchEvent(winEvent);
                return true; // Return a value to stop processing the additional move count check.
            }
        }
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`)
        if (this.moveCount >= 9) {
            console.log(`This game is a draw at ${this.moveCount} moves.`);
            this.gameStatus = 'draw';

            // If a draw, `drawEvent` dispatches the signal "draw".
            let drawEvent = new Event('draw');
            document.dispatchEvent(drawEvent);
        }
    }
  
    // This method handles recording a move in the `this.gameState` property.
    recordMove(event){
      console.log('Recording Move.');
        let tileX = event.target.dataset.x;
        let tileY = event.target.dataset.y;
        // Claim spot in the `this.gameState` array for the player.
        this.gameState[tileX][tileY] = this.currentPlayer.token;
        // Set the class on the `event.target` to show the player's token.
        event.target.setAttribute('class', `tile played glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    
    // This method handles switching between players after each move.
    switchPlayer(){
      console.log('Switching Player.');
        if (this.currentPlayer === this.player1){
          this.currentPlayer = this.player2;
        } else{
          this.currentPlayer = this.player1;
        }
    
      // Set the `class` attribute on `this.currentPlayerToken` to current player's token.
      this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`);
    }
    
      // This method finds all the tiles and applys event listeners to them.
    setUpTileListeners(){
      console.log('Setting up Tile Listeners.');
        let tileElements = document.querySelectorAll('.tile');
        for (let tile of tileElements){
          tile.addEventListener('click', handleMove);
        }
    }
    
    // This method displays the end game screen for a Win.
    showWinScreen(){
        console.log('Now showing win screen.');
        this.winScreen.setAttribute('class', 'show');
        this.winnerToken.setAttribute('class', `glyphicon${this.winner.token}`);
    }
    
    // This method displays the end game screen for a Draw.
    showDrawScreen(){
        this.drawScreen.setAttribute('class', 'show');
    }
    
  setUpBoard(){
      console.log('Setting up game board.');
        // Clear content `this.gameboard` element. Draw gameboard with three rows and three columns, 
        // each with tiles in them, for a total of nine tiles. Set `newTile` to call the glyphicon             // styles.
        this.gameboard.innerHTML = '';
        for (let i=0; i<3; i++){ // rows
          let newRow = document.createElement('div');
          newRow.setAttribute('class', 'row');
            
        for (let j=0; j<3; j++){ // columns
          let newCol = document.createElement('div');
          newCol.setAttribute('class', 'col-xs-3');
          
        let newTile = document.createElement('span');
                newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign');
                newTile.dataset.x = i;
                newTile.dataset.y = j;
                newCol.appendChild(newTile);
                newRow.appendChild(newCol);
             } // Second `for` loop ends here.
            this.gameboard.appendChild(newRow);
        } // First `for` loop ends here.
        // Add event listeners to the `.tile` elements.
        this.setUpTileListeners();
    }
    
  initializeMovePrompt(){
      console.log('Initializing move prompt.');
        this.startPrompt.setAttribute('class', 'hidden');
        this.movePrompt.setAttribute('class', '');
        this.currentPlayer = this.player1;
    }
  
  // This method handles the logic to create a new game: set up board and initialize first move.  
  start(){
        console.log('Starting game.');
        this.setUpBoard();
        this.initializeMovePrompt();
  }
} // End of the Tic Tac Toe Class definition.

let game;
console.log('Game code starting.');
// Event listener to enable `start` button to begin a new game with a click event,
// only after the DOM content has loaded.
document.addEventListener('DOMContentLoaded', function(event){
    let startButton = document.querySelector(`#start-button`);
    startButton.addEventListener('click', function(event){
      game = new TicTacToe();
      game.start();
    }); 
}); 

// Event listener on the `document` object that listens for the "win" event signal
// and then displays the win screen.
document.addEventListener('win', function(event){
  console.log('Detected win event.');
  game.showWinScreen();
});
    
// Event listener on the `document` object that listens for the "draw" event signal
// and then displays the draw screen.
document.addEventListener('draw', function(event){
  console.log('Detected draw event.');
  game.showDrawScreen();
});

// External function for event listeners provided for you.
function handleMove(event){
    // Record the move for the current player.
    game.recordMove(event);

    // Check to see if the last move was a winning move.
    game.checkForWinner();

    // Rotate players.
    game.switchPlayer();
}
