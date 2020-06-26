let start = false;
let new_line;
let tempx = 0;
let tempy = 0;
let walls = [];
let rays = [];


class Wall {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    };

    draw_line() {
        stroke(255);
        line(this.x1, this.y1, this.x2, this.y2);
    };
};

class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.dir = p5.Vector.fromAngle(angle);
        this.x2 = this.pos.x + this.dir.x;
        this.y2 = this.pos.y + this.dir.y;
    };

    draw_line(x2, y2) {
        stroke(255);
        strokeWeight(1);
        const x1 = this.pos.x;
        const y1 = this.pos.y;
        line(x1, y1, x2, y2);
        strokeWeight(4);
    };

    update_pos(x, y) {
        const xdiff = x - this.pos.x;
        const ydiff = y - this.pos.y;
        this.pos.x = this.pos.x + xdiff;
        this.pos.y = this.pos.y + ydiff;
        this.x2 = this.x2 + xdiff;
        this.y2 = this.y2 + ydiff;
    };


    calc_intersect(x3, y3, x4, y4) {
        // console.log(this.x1, this.y1, this.x2, this.y2, x3, y3, x4, y4)
        const x1 = this.pos.x;
        const y1 = this.pos.y;
        const x2 = this.x2;
        const y2 = this.y2;

        const tell = (x3 - x4) * (y1 - y2) - (y3 - y4) * (x1 - x2);
        if (tell == 0) {
            return;
        };
        const t = ((x3 - x1) * (y1 - y2) - (y3 - y1) * (x1 - x2)) / tell;
        const u = ((x3 - x4) * (y3 - y1) - (y3 - y4) * (x3 - x1)) / tell;
        if (t > 0 && t < 1 && u < 0) {
            const xintersect = x3 + t * (x4 - x3);
            const yintersect = y3 + t * (y4 - y3);
            return [xintersect, yintersect];
        } else {
            return;
        };

    };
};


function setup() {
    createCanvas(800, 800);
    background(0);
    strokeWeight(4);
    walls.push(new Wall(-10,-10,-10,height + 10));
    walls.push(new Wall(-10,-10,width+10,-10));
    walls.push(new Wall(-10,height+10,width + 10,height+10));
    walls.push(new Wall(width+10,-10,width+10,height + 10));
    for (let i = 0; i < 360; i += 4){
        rays.push(new Ray(createVector(width/2, height/2), radians(i)));
    };
    draw_walls();
};

function draw() {
    if (start == true) {
        ellipse(mouseX, mouseY, 20);
        clear();
        background(0);
        draw_walls();
        draw_rays();
    };
};

function keyPressed() {
    if (keyCode === ENTER) {
        start = !start;
        console.log(start, 'updated');
    };
};


function mousePressed() {
    new_line = [mouseX, mouseY];
};

function mouseReleased() {
    let coord = [mouseX, mouseY];
    if (coord[0] > width && new_line[0] > width){
        console.log('te groote x');
    } else if (coord[0] < 0 && new_line[0] < 0) {
        console.log('te kleine x');
    } else if (coord[1] > width && new_line[1] > width) {
        console.log('te groote y');
    } else if (coord[1] < 0 && new_line[1] < 0) {
        console.log('te kleine y');
    } else {
        stroke(255);
        line(new_line[0], new_line[1], coord[0], coord[1]);
        walls.push(new Wall(new_line[0], new_line[1], coord[0], coord[1]));
        draw_rays(false);
    };
};

function mouseDragged() {
    clear();
    background(0);
    draw_walls();
    draw_rays(false);
    tempx = mouseX;
    tempy = mouseY;
    stroke(255);
    line(new_line[0], new_line[1], tempx, tempy);
};

function draw_walls() {
    for (let i = 0; i < walls.length; i++) {
        walls[i].draw_line();
    };
};

function draw_rays(update_loc = true) {
    for (let i = 0; i < rays.length; i++) {
        if (update_loc == true){
            rays[i].update_pos(mouseX, mouseY);
        };
        let inter = [];
        let lowest = width + height;
        for (let j = 0; j < walls.length; j++){
            let temp = rays[i].calc_intersect(walls[j].x1, walls[j].y1, walls[j].x2, walls[j].y2);
            if (!temp) {continue};
            let diffX = abs(rays[i].pos.x - temp[0]) ** 2;
            let diffY = abs(rays[i].pos.y - temp[1]) ** 2;
            let distance =  (diffX + diffY) ** .5;
            if (distance < lowest){
                lowest = distance;
                inter = temp;
            };
        };
        if (inter != []){
            rays[i].draw_line(inter[0], inter[1]);
        };
    };
};