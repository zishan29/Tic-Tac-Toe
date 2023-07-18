let gameBoard = (() => {
    let board = [['', '', ''], ['', '', ''], ['', '', '']];
    return {board};
})();

function players(player1, player2) {
    return {player1: player1, player2: player2};
}

function gameFlow() {

}

let choice = "X";
let prev = '';

let $players = players('player', 'someOtherPlayer');
console.log($players.player1, $players.player2)
console.log(gameBoard.board);

const board = document.querySelector('.board');
for(let i = 0; i < gameBoard.board.length; i++) {
    for(let j = 0; j < gameBoard.board.length; j++) {
        const div = document.createElement('div');
        div.textContent = gameBoard.board[i][j];
        div.classList.add('box');
        board.appendChild(div);
    }
}

const $box = document.querySelectorAll('.box');
$box.forEach((box) => {
    if(box.textContent === "") {
        box.addEventListener('click', () => {
            if(prev === '') {
                box.textContent = choice;
                prev = choice;
                console.log(`this ${prev}`);
            } else if(prev === 'X') {
                box.textContent = 'O';
                prev = 'O'
                console.log(prev);
            } else if(prev === 'O') {
                box.textContent = 'X';
                prev = 'X';
                console.log(prev);
            }
        }, {once: true});
    } else {
        box.removeEventListener();
    }
});