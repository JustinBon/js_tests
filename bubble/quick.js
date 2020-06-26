let start = false;
let bars = [];
let sorted = false;
const w = 4;
const stepsize = 6;
let barcolor = {}

function setup() {
    createCanvas(800,800);
    for (let i = 0; i < 200; i++){
        bars.push(i);
    };
    bars = shuffling(bars);
    update_colors();
};

function draw() {
    background(0);
    if (start == true) {
        if (sorted == false) {
            bars = quick(bars);
            console.log('main loop')
            sorted = true;
        };
    };
    drawbar();
};

function keyPressed() {
    if (keyCode === ENTER) {
        start = !start;
        console.log(start);
    } else if (keyCode === 32) {
        bars = quick(bars);
    };
};

function drawbar() {
    for (let i = 0; i < bars.length; i++) {
        stroke(barcolor[bars[i]]);
        line(i*w, height - bars[i]*4, i*w, height);
    };
};

function update_colors() {
    let r = 255;
    let g = 0;
    let b = 0;

    for (let i = 0; i < 200; i++) {
        if (r == 255 && g != 255 && b == 0){
            g = g + stepsize;
        } else if (r != 0 && g == 255 && b == 0) {
            r = r - stepsize;
        } else if (r == 0 && g == 255 && b != 255) {
            b = b + stepsize;
        } else if (r == 0 && g != 0 && b == 255) {
            g = g - stepsize;
        } else if (r != 255 && g == 0 && b == 255) {
            r = r + stepsize;
        } else if (r == 255 && g == 0 && b != 0) {
            b = b - stepsize;
        };
        barcolor[i] = [r,g,b];
        r = rev(r);
        g = rev(g);
        b = rev(b);
    };
};

function rev(n) {
    if (n > 255) {
        n = 255;
    } else if (n < 0) {
        n = 0 ;
    };
    return n;
};


function shuffling(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      };
    return array;
};

function quick(arr) {
    let l = arr.length;
    let i = -1;
    let pivot = arr[l - 1];
    let temp;
    let r = [];

    if (l == 2) {
        if (arr[0] > arr[1]) {
            temp = arr[0];
            arr[0] = arr[1];
            arr[1] = temp
        };
        return arr;
    } else if (l < 2) {
        return arr;
    }

    for (let j = 0; j < l - 1; j++) {
        if (arr[j] <= pivot) {
            i++;
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
            drawbar()
            sleep(100);
        };
    };

    i++;
    temp = pivot;
    arr[l - 1] = arr[i];
    arr[i] = temp; 

    let arr1 = arr.slice(0, i);
    let arr2 = arr.slice(i + 1, arr.length);
    let arr3 = arr.slice(i,i+1);

    if (arr1.length > 1) {
        arr1 = [quick(arr1)];
    };

    if (arr2.length > 1) {
        arr2 = quick(arr2);
    };
    arr1.push(arr3[0])
    Array.prototype.push.apply(arr1, arr2);
    r = arr1.flat();
    return r;
};

  