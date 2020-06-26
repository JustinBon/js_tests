let board = [];
let start = false;


function setup() {
    createCanvas(800, 800);
    let board = make_board()
    console.log(board.length, board[0].length)
    update() 
};

function make_board() {
    for (let i = 0; i < height/10; i++){
        let row = [];
        for (let j = 0; j < width/10; j++){
            row.push('');
        };
        board.push(row);
    }; 
    return board;
};

function mousePressed() {
    let x = parseInt(mouseX / 10, 10) * 10;
    let y = parseInt(mouseY / 10, 10) * 10;
    if (x <= width && y <= height) {
        x = x/10;
        y = y/10;
        if (board[y][x] == ''){
            board[y][x] = ' ';

        } else {
            board[y][x] = '';
        }
        update()
    };
};

function mouseDragged() {
    console.log(mouseX, mouseY)
    let x = parseInt(mouseX / 10, 10) * 10;
    let y = parseInt(mouseY / 10, 10) * 10;
    if (x <= width && y <= height) {
        board[y/10][x/10] = ' ';
        fill('black');
        square(x, y, width/(width/10));
    };
};

function keyPressed() {
    if (keyCode === ENTER) {
        start = !start;
        console.log(start, 'updated');
    };

    if (keyCode === DELETE){
        clear();
    };
};

function next_round() {
    let top = board.length - 1
    let updatelist = [];
    for (let i = 0; i < board[0].length; i++){
        for (let j = 0; j < board[0].length; j++){
            let neigbors = 0;
            if (i != 0) {
                if (board[i -1][j] == ' ') {
                    neigbors = neigbors + 1;
                };
            };
            if (j != 0) {
                if (board[i][j - 1] == ' ') {
                    neigbors = neigbors + 1;
                };
            };
            if (i != top) {
                if (board[i + 1][j] == ' ') {
                    neigbors = neigbors + 1;
                };
            };
            if (j != top) {
                if (board[i][j + 1] == ' ') {
                    neigbors = neigbors + 1;
                };
            };
            if (i != 0 && j != 0) {
                if (board[i - 1][j - 1] == ' ') {
                    neigbors = neigbors + 1;
                };
            };
            if (i != 0 && j != top) {
                if (board[i - 1][j + 1] == ' ') {
                    neigbors = neigbors + 1;
                };
            };
            if (i != top && j != top) {
                if (board[i + 1][j + 1] == ' ') {
                    neigbors = neigbors + 1;
                };
            };
            if (i != top && j != 0) {
                if (board[i + 1][j - 1] == ' ') {
                    neigbors = neigbors + 1;
                };
            };
            
            switch (neigbors) {
                case 2:
                    break;
                case 3:
                    if (board[i][j] == ''){
                        updatelist.push([i,j]);
                    };
                    break;
                default:
                    if (board[i][j] == ' '){
                        updatelist.push([i,j])
                    };
            };
        };
    };

    for (let i = 0; i < updatelist.length; i++){
        let x = updatelist[i][0]
        let y = updatelist[i][1]
        if (board[x][y] == ''){
            board[x][y] = ' ';
        } else {
            board[x][y] = '';
        };
    };
};


function draw() {
    if (start == true) {
        next_round();
        update();
    };
};


function update(){
    clear()
    let x = 0;
    let y = 0;
    let update = width/(width/10);
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[0].length; j++){
            if (board[i][j] == ''){
                fill('white');
                square(x, y, update);
            } else {
                fill('black');
                square(x, y, update);
            };
            
            x = x + update;
        };
        y = y + update;
        x = 0;
    };
};