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
        if (boardIsFull || gameIsWon || space < 0 || space > 8 || board[space] === "undefined") {
            return false;
        }

        else {
            board[space] = symbol;
            size++;
            if (size === 9) {
                boardIsFull = true;
            }

            // if (space === 0) {
            //     if ( (array[1] === symbol && array[2] === symbol) ||
            //             (array[3] === symbol && array[6] === symbol) ||
            //             (array[4] === symbol && array[8] === symbol)
            // ) {
            //         setWinner(symbol);
            // }

                
            // }
            if (
                (board[0] === symbol && board[1] === symbol || board[2] === symbol) ||
                (board[3] === symbol && board[4] === symbol || board[5] === symbol) ||
                (board[6] === symbol && board[7] === symbol || board[8] === symbol) ||
                (board[0] === symbol && board[3] === symbol || board[6] === symbol) ||
                (board[1] === symbol && board[4] === symbol || board[7] === symbol) ||
                (board[2] === symbol && board[5] === symbol || board[8] === symbol) ||
                (board[0] === symbol && board[4] === symbol || board[8] === symbol) ||
                (board[2] === symbol && board[4] === symbol || board[6] === symbol) 
            ) {
                gameIsWon = true;
                winner = symbol;
            }

            size++;
            if (size === 9) {
                boardIsFull = true;
            }
            return true;
        }
    }

    return {getBoardIsFull, getGameIsWon, getWinner, placeSymbol};

})();