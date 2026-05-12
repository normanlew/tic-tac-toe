const gameBoard = (() => {
    const board = new Array(9);
    size = 0;
    let boardIsFull = false;
    let gameIsWon = false;
    let winner = undefined;

    const getBoardIsFull = () => {
        return boardIsFull;
    };

    const getGameIsWon = () => {
        return gameIsWon;
    }

    const getWinner = () => {
        return winner;
    }

    const placeSymbol = (symbol, space) => {
        symbol = symbol.toUpperCase();
        if (boardIsFull || gameIsWon || space < 0 || space > 8 || board[space] !== undefined || size >= 9) {
            return false;
        }

        else {
            board[space] = symbol;
            size++;
            if (size >= 9) {
                boardIsFull = true;
            }

            if (
                (board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
                (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
                (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
                (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
                (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
                (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
                (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
                (board[2] === symbol && board[4] === symbol && board[6] === symbol) 
            ) {
                gameIsWon = true;
                winner = symbol;
            }

            return true;
        }
    }

    return {getBoardIsFull, getGameIsWon, getWinner, placeSymbol};

})();

function createPlayer(name, symbol) {
    symbol = symbol.toUpperCase();
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
}

function createGameControl(player1, player2, gameBoard) {
    let player1Turn = Math.random() > 0.5;

    const squares = document.querySelectorAll(".square")
    const playGame = (() => {
        do {
            let player;

            if (player1Turn) {
                player = player1;
            }
            else {
                player = player2;
            }

            const spaceNumber = prompt(`${player.getName()}, choose a space`);
            console.log(spaceNumber);
            if (!gameBoard.placeSymbol(player.getSymbol(), spaceNumber)) {
                console.log("try another space");
            } else {
                if (player1Turn) {
                    player1Turn = false;
                }
                else {
                    player1Turn = true;
                }
            }
        } while (!gameBoard.getBoardIsFull() && !gameBoard.getGameIsWon());
        
        // console.log(gameBoard.getBoardIsFull());
        // console.log(gameBoard.getGameIsWon());
        if (gameBoard.getGameIsWon()) {
            if (player1.getSymbol() === gameBoard.getWinner()) {
                console.log(`${player1.getName()} wins!`)
            }
            else {
                console.log(`${player2.getName()} wins!`)
            }
        }
        else if (gameBoard.getBoardIsFull()) {
            console.log("The board is full and nobody won.")
        }
    });

    return {playGame};
};