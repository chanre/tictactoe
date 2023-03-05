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

    return {updateBoard, gameStep, checkWin};
})();

const newPlayer = (sign) => {
    const getSign = () => {return sign};
    return {getSign};
};

const displayController = (() => {
    const slots = document.querySelectorAll(".slot");
    const playerX = newPlayer("X");
    const playerO = newPlayer("O");
    let counter = 1;

    slots.forEach(element => element.addEventListener("click", () => {
        if (counter % 2 == 0) {
            counter += gameBoard.gameStep(playerO, element.id);    
            gameBoard.updateBoard();
            if (gameBoard.checkWin(element.id, playerO.getSign())) {
                console.log("wiener");
            };
        } else {
            counter += gameBoard.gameStep(playerX, element.id);    
            gameBoard.updateBoard();
            if (gameBoard.checkWin(element.id, playerX.getSign())) {
                console.log("wiener");
            };
        };
        
    }));
    

})();



