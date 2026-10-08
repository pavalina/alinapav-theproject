let img;

function preload() {
  img = loadImage(
    "https://pavalina.github.io/alinapav-theproject/ProjectRose.png",
    imageLoaded,
    imageFailed
  );
}

function imageLoaded() {
  console.log("IMAGE LOADED");
}

function imageFailed() {
  console.log("IMAGE FAILED");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200, 255, 200);

  if (img) {
    image(img, 0, 0, width, height);
  }
}