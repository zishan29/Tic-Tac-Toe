const playerScoreX = document.querySelector('#player-x');
const playerScoreO = document.querySelector('#player-o');
const restart = document.querySelector("#restart");
const close = document.querySelector('#close');
let prev = 'O';
let moves = 1;

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

function checkTie() {
    return moves++;
}

function gameStart() {
    const winner = document.querySelectorAll('.winner');
    const win = document.querySelector('#win');
    const container = document.querySelector('.container');
    const $box = document.querySelectorAll('.box');
    $box.forEach((box) => {
        box.addEventListener('click', (e) => {
            if(e.target.textContent === 'X' || e.target.textContent === 'O') {
                return;
            } else {
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
                        winner.forEach(winner => winner.classList.add('visible'));
                        win.textContent = 'O'
                        playerScoreO.textContent = parseInt(playerScoreO.textContent) + 1;
                        container.classList.add('blur');
                    }
                    if(checkTie() === 9) {
                        const tie = document.querySelector('#tie');
                        winner.forEach(winner => winner.classList.add('visible'));
                        tie.textContent = "It's a Tie"
                        win.textContent = ''
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
                        winner.forEach(winner => winner.classList.add('visible'));
                        win.textContent = 'X';
                        container.classList.add('blur');
                        playerScoreX.textContent = parseInt(playerScoreX.textContent) + 1;
                    }
                    if(checkTie() === 9) {
                        const tie = document.querySelector('#tie');
                        winner.forEach(winner => winner.classList.add('visible'));
                        tie.textContent = "It's a Tie"
                        win.textContent = ''
                        container.classList.add('blur');
                    }
                }
            }
        });
    });
}

function resetGame() {
    gameBoard.board = [['', '', ''], ['', '', ''], ['', '', '']];
    displayBoard();
    prev = 'O';
    gameStart();

}

function resetScreen() {
    gameBoard.board = [['', '', ''], ['', '', ''], ['', '', '']];
    displayBoard();
    prev = 'O';
    gameStart();
    playerScoreO.textContent = 0;
    playerScoreX.textContent = 0;
}

function resetScore() {
    playerScoreO.textContent = 0;
    playerScoreX.textContent = 0;
}

close.addEventListener('click', () => {
    resetGame();
    const winner = document.querySelectorAll('.winner');
    const container = document.querySelector('.container');
    winner.forEach(winner => winner.classList.remove('visible'));
    container.classList.remove('blur');
    moves = 1;
});

restart.addEventListener('click', resetScreen);

displayBoard();
gameStart();

