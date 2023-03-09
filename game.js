const gameBoard = (() => {
    let board = new Array(9);  

    const updateBoard = () => {
        for(let i = 0; i < board.length; i++) {
            const slot = document.getElementById(i);
            slot.textContent = board[i];
        };
    };

    const gameStep = (player, slot) => {
        let sign = player.getSign();
        if (board[slot]) {
            return 0;
        } else {
            board[slot] = sign;
            return 1;
        }
    }

    const checkWin = (currentIndex,currentSign) => {
        const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        return wins.filter((permutation) => permutation
        .includes(Number(currentIndex)))
        .some((chance) => chance
        .every((position) => board[position] === currentSign));
        
    }

    const resetBoard = () => {
        board.length = 0;
        board.length = 9;
    }

    return {updateBoard, gameStep, checkWin, resetBoard};
})();

const newPlayer = (sign, name) => {
    const getSign = () => {return sign};
    const getName = () => {return name};
    return {getSign, getName};
};

const displayController = (() => {
    const slots = document.querySelectorAll(".slot");
    const restart = document.querySelector(".restart");
    const playerX = newPlayer("X", "Player X");
    const playerO = newPlayer("O", "Player O");
    let message = document.querySelector(".message");
    let counter = 0;
    let gameDone = false;

    slots.forEach(element => element.addEventListener("click", () => {
        if (gameDone) return;
        if (counter % 2 == 0) {
            counter += gameBoard.gameStep(playerO, element.id);    
            gameBoard.updateBoard();
            message.textContent = playerX.getName() + "'s turn!";
            if (gameBoard.checkWin(element.id, playerO.getSign())) {
                message.textContent = playerO.getName() + " wins!";
                gameDone = true;
            } else if (counter === 9) {
                message.textContent = "It's a tie!";
                gameDone = true;
            };
        } else {
            counter += gameBoard.gameStep(playerX, element.id);    
            gameBoard.updateBoard();
            message.textContent = playerO.getName() + "'s turn!";
            if (gameBoard.checkWin(element.id, playerX.getSign())) {
                message.textContent = playerX.getName() + " wins!"
                gameDone = true;
            } else if (counter === 9) {
                message.textContent = "It's a tie!";
                gameDone = true;
            };;
        };
    
    }));
    
    restart.addEventListener("click", () => {
        gameBoard.resetBoard();
        gameBoard.updateBoard();
        counter = 0;
        message.textContent = playerX.getName() + "'s turn!";
    });


})();



