let first_game = true;

const gameBoard = (() => {
    const board = new Array(9);
    let size = 0;
    let boardIsFull = false;
    let gameIsWon = false;
    let winner = undefined;

    const resetBoard = () => {
        board.fill(undefined);
        size = 0;
        boardIsFull = false;
        gameIsWon = false;
        winner = undefined;
    };

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

    return {resetBoard, getBoardIsFull, getGameIsWon, getWinner, placeSymbol};

})();

function createPlayer(name) {
    const getName = () => name;

    return {getName};
}

function createGameControl(player1, player2, gameBoard) {
    gameBoard.resetBoard();
    const dict = {"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
                    "six": 6, "seven": 7, "eight": 8};

    let player1Turn = Math.random() > 0.5;

    let announce = document.querySelector(".game-announcements")

    if (player1Turn) {
        announce.innerHTML = `<p>${player1.getName()}, your move</p>`;
    }
    else {
        announce.innerHTML = `<p>${player2.getName()}, your move</p>`;
    }

    const putSymbolOnBoard = ((element) => {
        console.log("in putSymbolOnBoard function");
        let player;
        let symbol;
        let spaceNumber = dict[element.id];
        

        if (!gameBoard.getBoardIsFull() && !gameBoard.getGameIsWon()) {
            console.log("game is playable");
            if (player1Turn) {
                symbol = "X";
            }
            else {
                symbol = "O";
            }

            if (!gameBoard.placeSymbol(symbol, spaceNumber)) {
                console.log("try another space");
            } else {

                if (player1Turn) {
                    console.log("player 1 places X");
                    element.innerHTML=`
                    <svg height="140" width="140" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20" y1="20" x2="120" y2="120" style="stroke:blue;stroke-width:12" />
                        <line x1="20" y1="120" x2="120" y2="20" style="stroke:blue;stroke-width:12" />
                        </svg>`
                    player1Turn = false;
                }
                else {
                    console.log("player 2 places Y");
                    element.innerHTML=`
                        <svg height="140" width="140" xmlns="http://www.w3.org/2000/svg">
                        <circle class="svg-circle" cx="70" cy="70" r="60" fill="red"/>
                        </svg>`
                    player1Turn = true;
                }

                if (gameBoard.getGameIsWon()) {
                    if ("X" === gameBoard.getWinner()) {
                        // console.log(`${player1.getName()} wins!`)
                        announce.innerHTML = `<p>${player1.getName()} wins!</p>`;
                    }
                    else {
                        announce.innerHTML = `<p>${player2.getName()} wins!</p>`;
                    }
                }
                else if (gameBoard.getBoardIsFull()) {
                    console.log("The board is full and nobody won.")
                }
                else {
                    if (player1Turn) {
                        announce.innerHTML = `<p>${player1.getName()}, your move</p>`;
                    }
                    else {
                        announce.innerHTML = `<p>${player2.getName()}, your move</p>`;
                    }
                }
            }
        }
    });

    return {putSymbolOnBoard};

};

const start_button = document.querySelector("#new-game");

start_button.addEventListener("click", (e) => {
    startGame();
});

function startGame() {

    let player1Name = prompt("Hi Player One, what is your name? ")
    let player2Name = prompt("Hi Player Two, what is your name? ")

    const player1 = createPlayer(player1Name);
    const player2 = createPlayer(player2Name);

    const game = createGameControl(player1, player2, gameBoard);

    const squares = document.querySelectorAll(".square")

    squares.forEach((element) => {
        element.innerHTML = "";
        if (first_game) {
            element.addEventListener(("click"), () => {
                console.log("click");
                game.putSymbolOnBoard(element);
            })
        }
    })
    first_game = false;
}

