const gameBoard = (() => {
  let board = ["","","","","","","","",""]

  let displayBoard = () => {
    var boxElements = []
    for (i in board) {
      boxElements[i] = document.getElementById(`box${parseInt(i) + 1}`)
      boxElements[i].innerHTML = board[i]
    }
  }

  let resetGame = () => {
    let reset = document.getElementById('reset')
    reset.addEventListener('click', () => {
      gameBoard.displayBoard()
      gameFlow.displayTurn(gameFlow.decideStartingPlayer())
      gameFlow.boxes.forEach(box => box.addEventListener('click', gameFlow.clickHandler))
    })
  }

  return {
    board, 
    displayBoard, 
    resetGame
  }
})()

const gameFlow = (() => {
  let turnDisplay = document.getElementById('player-turn')
  let boxes = document.querySelectorAll('.box')
  let activePlayer

  let decideStartingPlayer = () => {
   let result =  (Math.random() < .5) ? player1 : player2
   return result
  }

  let displayTurn = (player) => {
    let activePlayer =  (player === undefined) ? gameFlow.decideStartingPlayer() : player
    turnDisplay.innerHTML = `${activePlayer.name}'s Turn`
    return activePlayer
  }

  function clickHandler(e) {
    e.target.innerHTML = activePlayer.marker;
    activePlayer = (activePlayer === player1) ? player2 : player1;
    gameFlow.displayTurn(activePlayer);
    if (gameFlow.checkForWinner() === true) {
        gameFlow.declareWinner(activePlayer);
    } else if (gameFlow.checkForWinner() === 'draw') {
      turnDisplay.innerHTML = "It's a draw!"
      boxes.forEach(box => box.removeEventListener('click', clickHandler))
    }
  }

  let placeMarker = () => {
    activePlayer = gameFlow.displayTurn()

    boxes.forEach(box => {
      box.addEventListener('click', clickHandler);
    })
  }

  let checkForWinner = () => {
    let elements = document.querySelectorAll('.box');
    let board = [];
    let filledSpots = 0

    elements.forEach((e) => {
        board.push(e.innerHTML);
    });

    if (board[0] === board[1] && board[1] === board[2] && board[0] !== "") {
      return true;
    } else if (board[3] === board[4] && board[4] === board[5] && board[3] !== "") {
        return true;
    } else if (board[6] === board[7] && board[7] === board[8] && board[6] !== "") {
        return true;
    } else if (board[0] === board[3] && board[3] === board[6] && board[0] !== "") {
        return true;
    } else if (board[1] === board[4] && board[4] === board[7] && board[1] !== "") {
        return true;
    } else if (board[2] === board[5] && board[5] === board[8] && board[2] !== "") {
        return true;
    } else if (board[0] === board[4] && board[4] === board[8] && board[0] !== "") {
        return true;
    } else if (board[2] === board[4] && board[4] === board[6] && board[2] !== "") {
        return true;
    } else {
      board.forEach(spot => {
        if (spot !== "") {
          filledSpots++
        }
      })
      if (filledSpots === board.length) {
        return "draw"
      }
    }
  }

  let declareWinner = (activePlayer) => {
    activePlayer = (activePlayer == player1) ? player2 : player1
    turnDisplay.innerHTML = `${activePlayer.name} wins!`
    boxes.forEach(box => box.removeEventListener('click', clickHandler))
  }

  return{
    decideStartingPlayer,
    displayTurn, 
    placeMarker,
    checkForWinner, 
    declareWinner, 
    boxes, 
    clickHandler
  }
})()


const player = (name, marker) => {
  return {
    name,
    marker
  }
}

gameBoard.displayBoard()

let player1 = player("Elvin", "X")
let player2 = player("Computer", "O")

gameFlow.placeMarker()
gameBoard.resetGame()