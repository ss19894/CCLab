/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let bubbles = [];
let bodyColor;
let bellyColor;
let finColor;
let detailColor;

function randomizeColors() {
  bodyColor = color(random(255), random(255), random(255));
  bellyColor = color(random(255), random(255), random(255));
  finColor = color(random(255), random(255), random(255));
  detailColor = color(random(255), random(255), random(255));
}



function setup() {
  createCanvas(800, 500);
  randomizeColors();
  for (let i = 0; i < 30; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(10, 35),
      speed: random(0.2, 0.5),
      shade: random(150, 255)
    });
  }
}




function draw() {
  background(9, 28, 54);

  //noStroke();
  //for (let i = 0; i < 24; i++) 
  //{
  //let bx = (i * 83 + frameCount * 0.3) % width;
  //let by = (i * 57 - frameCount * 0.7 + height) % height;
  //fill(70, 210, 240, 150);
  //circle(bx, by, 4 + (i % 4));
  drawBubbles();


  drawCreature(width / 2, height / 2);
}

function drawBubbles() {
  for (let b of bubbles) {
    stroke(100, 210, b.shade, 180);
    strokeWeight(1.5);
    noFill();

    circle(b.x, b.y, b.size);
    b.y -= b.speed;
    if (b.y < -b.size) {
      b.y = height + b.size;
      b.x = random(width);
    }
  }
}




function wave(x) {
  return sin(frameCount * 0.055 + (x + 200) * 0.022) * 22;
}


function Width(x) {
  let w = map(x, -200, 200, 0, 1);
  return 4 + 27 * sin(PI * w);
}

function drawCreature(x, y) {
  push();
  translate(x, y);

  drawTail();

  drawSideFins();

  drawBody();

  drawOtherFins();

  let headY = wave(190);
  push();
  translate(190, headY);
  rotate(sin(frameCount * 0.055 + 4.4) * 0.1);
  drawHead();
  pop();
  drawMarks();

  pop();
}

function mousePressed() {
  randomizeColors();
}


// DRAW YOUR CREATURE HERE
// create additional functions below and call here:
function drawBody() {
  noStroke();
  //fill(15, 151, 169);
  fill(bodyColor);
  beginShape();

  for (let i = 0; i <= 100; i++) {
    let x = 200 - i * 4;
    vertex(x, wave(x) - Width(x));
  }

  for (let i = 100; i >= 0; i--) {
    let x = 200 - i * 4;
    vertex(x, wave(x) + Width(x));
  }

  endShape(CLOSE);
  fill(104, 222, 202)
  beginShape();

  for (let i = 0; i <= 100; i++) {
    let x = 200 - i * 4;
    vertex(
      x,
      wave(x) + Width(x) * 0.48
    );
  }

  for (let i = 100; i >= 0; i--) {
    let x = 200 - i * 4;
    vertex(x, wave(x) + Width(x));
  }

  endShape(CLOSE);

}
function drawTail() {
  push();
  translate(-195, wave(-195));
  rotate(sin(frameCount * 0.055) * 0.25);

  noStroke();
  fill(35, 107, 220);

  triangle(0, 0, -65, -48, -47, 0);
  triangle(0, 0, -65, 48, -47, 0);


  fill(detailColor);
  triangle(-4, 0, -53, -30, -42, 0);
  triangle(-4, 0, -53, 30, -42, 0);

  pop();
}

function drawSideFins() {
  for (let i = 0; i < 6; i++) {
    let x = -130 + i * 52;
    let y = wave(x) + Width(x) * 0.45;

    push();
    translate(x, y);
    rotate(0.5 + sin(frameCount * 0.05 + i) * 0.12);

    noStroke();
    fill(35, 110, 215);
    triangle(-5, 0, -30, 32, 20, 13);

    fill(45, 206, 205);
    triangle(-3, 3, -23, 25, 12, 12);

    pop();
  }
}
function drawOtherFins() {
  noStroke();

  for (let i = 0; i < 15; i++) {
    let x = 155 - i * 24;
    let y = wave(x);
    let thick = Width(x);
    let h = 13 + 8 * abs(sin(i * 0.7));

    fill(34, 110, 224);
    triangle(
      x - 12, y - thick * 0.78,
      x - 2, y - thick - h,
      x + 9, y - thick * 0.78
    );

    fill(46, 213, 207);
    triangle(
      x - 5, y - thick * 0.84,
      x - 2, y - thick - h + 4,
      x + 3, y - thick * 0.84
    )
  }
}

function drawHead() {
  noStroke();

  fill(17, 166, 177);
  ellipse(0, 0, 67, 49);

  fill(29, 193, 185);
  ellipse(24, 8, 42, 29);

  fill(107, 224, 201);
  ellipse(23, 18, 35, 10);

  stroke(69, 229, 210);
  strokeWeight(5);
  noFill();

  line(-17, -16, -27, -28);
  line(-27, -28, -43, -32);
  line(2, -19, -1, -31);
  line(-1, -31, -12, -39);

  noStroke();
  fill(8, 57, 92);
  ellipse(11, -8, 20, 19);

  fill(190, 255, 115);
  ellipse(13, -8, 12, 12);

  fill(8, 35, 62);
  ellipse(15, -8, 4, 9);




  fill(8, 70, 91);
  circle(39, 4, 4);

  stroke(69, 228, 208);
  strokeWeight(2);
  line(25, 15, 45, 25);
  line(27, 13, 49, 11);
}
function drawMarks() {
  noStroke();

  for (let i = 0; i < 17; i++) {
    let x = -155 + i * 21;
    let y = wave(x);
    let thick = Width(x);

    fill(120, 255, 225, 210);
    ellipse(x, y - thick * 0.35, 6, 4);
    ellipse(x + 5, y - thick * 0.12, 3, 3);
  }
}

