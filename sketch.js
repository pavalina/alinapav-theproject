let img;

function preload() {
  img = loadImage("ProjectRose.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200, 255, 200);

  imageMode(CENTER);
  image(img, width / 2, height / 2);
}