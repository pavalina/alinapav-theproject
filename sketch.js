let img;

function preload() {
  img = loadImage("ProjectRose.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200, 255, 200);

  image(img, 0, 0);
}