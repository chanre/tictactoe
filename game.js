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

    const updateMessage = (newMessage) => {
        const message = document.querySelector(".message");
        message.textContent = newMessage;
    }

    const resetBoard = () => {
        board.length = 0;
        board.length = 9;
    }

    return {updateBoard, gameStep, checkWin, resetBoard, updateMessage};
})();

const newPlayer = (sign, name) => {
    let playerName = name;
    const getSign = () => sign;
    const getName = () => playerName;
    const changeName = (newName) => playerName = newName;
    return {getSign, getName, changeName};
};

const displayController = (() => {
    const slots = document.querySelectorAll(".slot");
    const restart = document.querySelector(".restart");
    const playerX = newPlayer("X", "Player X");
    const playerO = newPlayer("O", "Player O");
    const submit = document.querySelector(".submit");
    let counter = 1;
    let gameDone = false;

    slots.forEach(element => element.addEventListener("click", () => {
        if (gameDone) return;
        if (counter % 2 == 0) {
            counter += gameBoard.gameStep(playerO, element.id);    
            gameBoard.updateBoard();
            gameBoard.updateMessage(playerX.getName() + "'s turn!");
            if (gameBoard.checkWin(element.id, playerO.getSign())) {
                gameBoard.updateMessage(playerO.getName() + " wins!");
                gameDone = true;
            } else if (counter === 10) {
                gameBoard.updateMessage("It's a tie!");
                gameDone = true;
            };
        } else {
            counter += gameBoard.gameStep(playerX, element.id);    
            gameBoard.updateBoard();
            gameBoard.updateMessage(playerO.getName() + "'s turn!");
            if (gameBoard.checkWin(element.id, playerX.getSign())) {
                gameBoard.updateMessage(playerX.getName() + " wins!");
                gameDone = true;
            } else if (counter === 10) {
                gameBoard.updateMessage("It's a tie!");
                gameDone = true;
            };;
        };
    
    }));
    
    restart.addEventListener("click", () => {
        gameBoard.resetBoard();
        gameBoard.updateBoard();
        counter = 1;
        gameBoard.updateMessage(playerX.getName() + "'s turn!");
        gameDone = false;
    });

    submit.addEventListener("click", () => {
        const nameX = document.getElementById("playerXName");
        const nameO = document.getElementById("playerOName");
        if (!nameX.value || !nameO.value) {
            alert("Please enter a name for both players!");
        } else {
            playerX.changeName(nameX.value);
            playerO.changeName(nameO.value);
            if (counter % 2 == 0) {
                gameBoard.updateMessage(playerO.getName() + "'s turn!");
            } else {
                gameBoard.updateMessage(playerX.getName() + "'s turn!");
            }
        }

    });

})();



