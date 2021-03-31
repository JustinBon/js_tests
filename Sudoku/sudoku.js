let board = [];
let size = 900;
let w = size/2;
let h = size/2;


class Number {
    constructor(row, column, value) {
        this.row = row;
        this.column = column;
        this.value = value;
        this.posibilities = [1,2,3,4,5,6,7,8,9];
    };

    get_pos() {
        return [this.row, this.column];
    };
};

function setup() {
    createCanvas(size, size, WEBGL);
    background(100);
    strokeWeight(4)

    // create big squares
    for (i=0;i<3;i++){
        for(j=0;j<3;j++){
            square(j*300-w, i*300-h, 300);
        };
    };

    // create smoll squares
    strokeWeight(1)
    for (i=0;i<9;i++){
        for(j=0;j<9;j++){
            square(j*100-w, i*100-h, 100);
        };
    };

    // prepare images

    // boards stores the game of size 9x9
    board = make_board(9);
    console.log(board);
};

// main loop
function draw() {
    fill(color(255,204,0));

    for (i = 0; i < board.length; i++) {
        for (j = 0; j < board[i].length; j++) {
            if (board[i][j].value != -1) {
                test = board[i][j].get_pos;
                console.log(test)
                square(j*100-w, i*100-h, 100);
            };
        };
    };
};

function make_board(s){
    for (let i = 0; i < s; i++){
        let row = [];
        for (let j = 0; j < s; j++){
            row.push(new Number(i,j,-1));
        };
        board.push(row);
    }; 
    return board;
};

function mouseClicked() {
    let x = floor(mouseX / 100);
    let y = floor(mouseY / 100);
    board[y][x] = 1;  
};