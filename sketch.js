
let rose;
let daisy;
let tulip;

let flowerOptions = [];

let selectedFlower = "";

let room = "flower-garden";

function preload() {
    rose = loadImage("Rose.png");
    daisy = loadImage("Daisy.png");
    tulip = loadImage("Tulip.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Join the flower garden room
    phoneSetup(room, { flower: "" });

    // Allow the person to join
    enableShareTap("Join the garden");

    flowerOptions = [
        { name: "Rose", image: rose },
        { name: "Daisy", image: daisy },
        { name: "Tulip", image: tulip }
    ];
}

function draw() {
    background(200, 255, 200);

    textAlign(CENTER, CENTER);
    fill(50);

    textSize(26);
    text("Choose your flower", width / 2, 70);

    // Show flower choices
    for (let i = 0; i < flowerOptions.length; i++) {

        let y = 170 + i * 150;

        fill(255);
        stroke(100, 150, 100);

        rect(width / 2 - 110, y - 55, 220, 110, 15);

        imageMode(CENTER);

        image(
            flowerOptions[i].image,
            width / 2,
            y - 10,
            75,
            75
        );

        noStroke();
        fill(50);
        textSize(18);

        text(
            flowerOptions[i].name,
            width / 2,
            y + 38
        );
    }

    textSize(16);

    if (selectedFlower !== "") {
        text(
            "Your flower: " + selectedFlower,
            width / 2,
            height - 45
        );
    }

    text(footerLine(), width / 2, height - 20);
}

function mousePressed() {

    if (!shareConnected) {
        return;
    }

    // Check which flower was selected
    for (let i = 0; i < flowerOptions.length; i++) {

        let y = 170 + i * 150;

        if (
            mouseX > width / 2 - 110 &&
            mouseX < width / 2 + 110 &&
            mouseY > y - 55 &&
            mouseY < y + 55
        ) {
            selectedFlower = flowerOptions[i].name;

            // Send the choice to the server
            me.flower = selectedFlower;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
