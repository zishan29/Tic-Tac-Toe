let prev = 'O';

let gameBoard = (() => {
    let board = [[, , ], [, , ], [, , ]];
    return {board};
})();

function displayBoard() {
    const board = document.querySelector('.board');
    board.textContent = "";
    for(let i = 0; i < gameBoard.board.length; i++) {
        for(let j = 0; j < gameBoard.board.length; j++) {
            const btn = document.createElement('button');
            if(gameBoard.board[i][j] === 1) {
                btn.textContent = 'X';
            } else if(gameBoard.board[i][j] === -1) {
                btn.textContent = 'O';
            } else {
                btn.textContent = gameBoard.board[i][j];
            }
            btn.classList.add('box');
            btn.classList.add(`row${i}`);
            btn.setAttribute('id', `column${j}`);
            board.appendChild(btn);
        }
    }
}

function checkWinner() {
    for(var i = 0; i<3;i++){
        var rowSum = 0;
        for(var j = 0; j<3;j++){
            rowSum += gameBoard.board[i][j];
        }
        if(rowSum === 3)
            return 'X';
        else if(rowSum === -3)
            return 'O'
    }

    for(var i = 0; i<3;i++){
        var colSum = 0;
        for(var j = 0; j<3;j++){
            colSum += gameBoard.board[j][i];
        }
        if(colSum === 3)
            return 'X'
        else if(colSum === -3)
            return 'O'
    }

    if(gameBoard.board[0][0] + gameBoard.board[1][1] + gameBoard.board[2][2] === 3)
        return 'X';
    else if(gameBoard.board[0][0] + gameBoard.board[1][1] + gameBoard.board[2][2] === -3)
        return 'O';

    if(gameBoard.board[2][0] + gameBoard.board[1][1] + gameBoard.board[0][2] === 3)
        return 'X';
    else if(gameBoard.board[2][0] + gameBoard.board[1][1] + gameBoard.board[0][2] === -3)
        return 'O'
}

function gameStart() {
    const $box = document.querySelectorAll('.box');
    $box.forEach((box) => {
        box.addEventListener('click', (e) => {
            if(prev === 'X') {
                if(e.target.classList.contains('row0')) {
                    if(e.target.id === 'column0'){
                        gameBoard.board[0][0] = -1;
                    } else if(e.target.id === 'column1') {
                        gameBoard.board[0][1] = -1;
                    } else {
                        gameBoard.board[0][2] = -1;
                    }
                }
                if(e.target.classList.contains('row1')) {
                    if(e.target.id === 'column0'){
                        gameBoard.board[1][0] = -1;
                    } else if(e.target.id === 'column1') {
                        gameBoard.board[1][1] = -1;
                    } else {
                        gameBoard.board[1][2] = -1;
                    }
                }
                if(e.target.classList.contains('row2')) {
                    if(e.target.id === 'column0'){
                        gameBoard.board[2][0] = -1;
                    } else if(e.target.id === 'column1') {
                        gameBoard.board[2][1] = -1;
                    } else {
                        gameBoard.board[2][2] = -1;
                    }
                }
                prev = 'O';
                displayBoard();
                gameStart();
                if(checkWinner() === 'O') {
                    const winner = document.querySelectorAll('.winner');
                    const win = document.querySelector('#win');
                    const container = document.querySelector('.container');
                    winner.forEach(winner => winner.classList.add('visible'));
                    win.textContent = 'O'
                    container.classList.add('blur');
                }
            } else {
                if(e.target.classList.contains('row0')) {
                    if(e.target.id === 'column0'){
                        gameBoard.board[0][0] = 1;
                    } else if(e.target.id === 'column1') {
                        gameBoard.board[0][1] = 1;
                    } else {
                        gameBoard.board[0][2] = 1;
                    }
                }
                if(e.target.classList.contains('row1')) {
                    if(e.target.id === 'column0'){
                        gameBoard.board[1][0] = 1;
                    } else if(e.target.id === 'column1') {
                        gameBoard.board[1][1] = 1;
                    } else {
                        gameBoard.board[1][2] = 1;
                    }
                }
                if(e.target.classList.contains('row2')) {
                    if(e.target.id === 'column0'){
                        gameBoard.board[2][0] = 1;
                    } else if(e.target.id === 'column1') {
                        gameBoard.board[2][1] = 1;
                    } else {
                        gameBoard.board[2][2] = 1;
                    }
                }
                prev = 'X';
                displayBoard();
                gameStart();
                if(checkWinner() === 'X') {
                    const winner = document.querySelectorAll('.winner');
                    const win = document.querySelector('#win');
                    const container = document.querySelector('.container');
                    winner.forEach(winner => winner.classList.add('visible'));
                    win.textContent = 'X';
                    container.classList.add('blur');
                }
            }
        }, {once: true});
    });
}

function resetGame() {
    gameBoard.board = [['', '', ''], ['', '', ''], ['', '', '']];
    displayBoard();
    prev = 'O';
    gameStart();
}

displayBoard();
gameStart();


const restart = document.querySelector("#restart");
restart.addEventListener('click', resetGame);
const playerChoice = document.querySelector("#player-choice");
playerChoice.addEventListener('click', () => {
    const player2 = document.querySelector('#player2');
    if(playerChoice.textContent === '1 PLAYER') {
        playerChoice.textContent = '2 PLAYERS';
        player2.textContent = 'COMPUTER(O)';
        resetGame();
    } else {
        playerChoice.textContent = '1 PLAYER';
        player2.textContent = 'PLAYER(O)';
        resetGame();
    }
});

const close = document.querySelector('#close')
close.addEventListener('click', () => {
    resetGame();
    const winner = document.querySelectorAll('.winner');
    const container = document.querySelector('.container');
    winner.forEach(winner => winner.classList.remove('visible'));
    container.classList.remove('blur');
})