let start = false;
let bars = [];
const size = 20;
const n = 20;
const min = 100;
const stepsize = 1;
const h = 400;
let varh = h;
let sizes = [];

class Bar {
    constructor(pos, height, width, min, j) {
        this.id = j;
        this.height = height;
        this.width = width;
        this.depth = width;
        this.max = height;
        this.min = min;
        this.zoffset = pos;
        this.direction = 'down';
    };

    show() {
        if (this.id == 0){
            translate(-200, 0, 0);
        };        
        // this.update_height();
        box(this.width, this.height, this.depth);
        translate(this.width, 0, this.zoffset * this.width)
    };

    update_height() {
        if (this.direction == 'down') {
            this.height = this.height - stepsize;
            if (this.height == this.min) {
                this.direction = 'up';
            }
        } else {
            this.height = this.height + stepsize;
            if (this.height == this.max) {
                this.direction = 'down';
            }
        }

    };
};

function setup() {
    createCanvas(800, 800, WEBGL);
    background(0);
    angleMode(DEGREES);
    for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < n; j += 1) {
            bars.push(new Bar(i, h, size, min, j));
            varh = varh - 5;
        };
        varh = h - (5 * i + 1)
    };
};
    

function draw() {
    if (start == true) {
        background(0);
        fill(255);
        rotateX(-20);
        for (let i = 0; i < bars.length; i++){
            bars[i].show();
        };
    } else {
        background(0);
    };
};

function keyPressed() {
    if (keyCode === ENTER) {
        start = !start;
        console.log(start, 'updated');
    };
};

