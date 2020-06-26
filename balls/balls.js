let x;
let y;
let start = false;
let size = 100;
let colors = [255,0,0];
let mode = 'random';
let obj = 'circle';

function setup() {
    createCanvas(800, 800);
    background(0);
    x = Math.round((Math.random() * width) + 1);
    y = Math.round((Math.random() * height) + 1);
    // for (let i = 0; i < colors.length; i++){
    //     colors[i] = Math.round(Math.random() * 256);
    // }
};

function draw() {
    if (start == true) {
        if (mode == 'random') {
            let xoffset = Math.round((Math.random() * 5) + 1) * (Math.random() < 0.5 ? -1 : 1);
            let yoffset = Math.round((Math.random() * 5) + 1) * (Math.random() < 0.5 ? -1 : 1);
            x = x + minus(xoffset, x);
            y = y + minus(yoffset, y);
        } else {
            x = mouseX;
            y = mouseY;
        }

        colors = update_colors(colors);
        fill(colors[0], colors[1], colors[2]);

        switch (obj) {
            case 'circle':
                ellipse(x,y,size);
                break;
            case 'triangle':
                triangle(x, y - 75, x - 50, y + 25, x + 50, y + 25);
                break;
            case 'square':
                square(x - (size / 2), y - (size / 2) ,size);
                break;
        };
    };
};

function keyPressed() {
    if (keyCode === ENTER) {
        start = !start;
        console.log(start, 'updated');
    } else if (keyCode === 77) {
        if (mode == 'random') {
            mode = 'mouse';
        } else if (mode == 'mouse') {
            mode = 'random';
        };
    } else if (keyCode === 67) {
        obj = 'circle';
    } else if (keyCode === 83) {
        obj = 'square';
    }else if (keyCode === 84) {
        obj = 'triangle';
    }
};

function minus(direction, coord) {
    if (direction + coord + (size/2) > width || coord + direction - (size/2) < 0){
        return direction * -1;
    };
    return direction;
};

function update_colors(colors) {
    // let index = Math.floor(Math.random() * 3);
    // colors[index] = colors[index] + ((Math.random() < 0.5 ? -1 : 1) * 5);
    let r = colors[0];
    let g = colors[1];
    let b = colors[2]
    if (r == 255 && g != 255 && b == 0){
        colors[1] = g + 1;
    } else if (r != 0 && g == 255 && b == 0) {
        colors[0] = r - 1
    } else if (r == 0 && g == 255 && b != 255) {
        colors[2] = b + 1;
    } else if (r == 0 && g != 0 && b == 255) {
        colors[1] = g - 1;
    } else if (r != 255 && g == 0 && b == 255) {
        colors[0] = r + 1;
    } else if (r == 255 && g == 0 && b != 0) {
        colors[2] = b - 1;
    }
    return colors
}