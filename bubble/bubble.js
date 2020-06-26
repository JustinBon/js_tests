let start = false;
let bars = [];
let switches = true;
const w = 4;
const stepsize = 6;
let colors = [255,0,0];

class Bar {
    constructor(value, loc, temp) {
        this.value = value;
        this.loc = loc;
        this.temp = temp;
        this.r = temp[0];
        this.g = temp[1];
        this.b = temp[2]
    };
    
    drawBar() {
        stroke(this.r, this.g, this.b);
        line(this.loc, this.value, this.loc, height);
    };

    updateLoc(i) {
        this.loc = i * w;
    };

};

function setup() {
    createCanvas(800,800);
    strokeWeight(w);
    stroke(255)

    for (let i = 0; i < height; i += w) {
        bars.push(new Bar(i, (height - i), colors));
        colors = update_colors(colors);
    };
    bars = shuffling(bars);

    for (let i = 0; i < bars.length; i++) {
        bars[i].updateLoc(i);
    };
};

function draw() {
    background(0);
    if (start == true) {
        if (switches == true) {
            bubbleSort();
        };
    } else {
        drawbar()
    };
    drawbar()
};

function keyPressed() {
    if (keyCode === ENTER) {
        start = !start;
        console.log(start);
    } else if (keyCode === 32) {
        bubbleSort();
        console.log(switches)
    };
};

function drawbar() {
    for (let i = 0; i < bars.length; i++) {
        bars[i].drawBar(i);
    };
};

function update_colors(colors) {
    let r = colors[0];
    let g = colors[1];
    let b = colors[2];

    if (r == 255 && g != 255 && b == 0){
        colors[1] = g + stepsize;
    } else if (r != 0 && g == 255 && b == 0) {
        colors[0] = r - stepsize;
    } else if (r == 0 && g == 255 && b != 255) {
        colors[2] = b + stepsize;
    } else if (r == 0 && g != 0 && b == 255) {
        colors[1] = g - stepsize;
    } else if (r != 255 && g == 0 && b == 255) {
        colors[0] = r + stepsize;
    } else if (r == 255 && g == 0 && b != 0) {
        colors[2] = b - stepsize;
    };

    for (let i = 0; i < colors.length; i++) {
        if (colors[i] > 255) {
            colors[i] = 255;
        } else if (colors[i] < 0) {
            colors[i] = 0 ;
        };
    };
    return colors;
};


function shuffling(array) {
    console.log('here')
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      };
    return array;
};


function bubbleSort() {
    console.log('sorting...')
    switches = false;
    for (let i = 0; i < bars.length - 1; i++) {
        if (bars[i].value < bars[i + 1].value) {
            let temp = bars[i];
            bars[i] = bars[i + 1];
            bars[i + 1] = temp;
            bars[i].updateLoc(i);
            bars[i + 1].updateLoc(i + 1);
            switches = true;
        };
        drawbar();
    };
};
