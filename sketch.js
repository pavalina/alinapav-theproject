
let Rose;
let Daisy;
let Tulip;

let selectedFlower = "";

const SHARE_HOST = 'https://p5-phone-share.npuckett.workers.dev';
const ROOM = 'a1-maple';

let roseButton;
let daisyButton;
let tulipButton;

function preload() {
    Rose = loadImage("Rose.png");
    Daisy = loadImage("Daisy.png");
    Tulip = loadImage("Tulip.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    shareSetup({
        host: SHARE_HOST,
        room: ROOM,
        app: 'flower-garden',
        me: { number: 0 }
    });

    //enablePermissionsTap(['share'], 'Join the garden');
    enableShareTap("Join the garden");

    // Create flower buttons using PNG images
    roseButton = createImg("Rose.png", "Rose");
    daisyButton = createImg("Daisy.png", "Daisy");
    tulipButton = createImg("Tulip.png", "Tulip");

    // Make the images clickable
    roseButton.mousePressed(function() {
        chooseFlower("Rose");
    });

    daisyButton.mousePressed(function() {
        chooseFlower("Daisy");
    });

    tulipButton.mousePressed(function() {
        chooseFlower("Tulip");
    });

    // Style the flower images
    let buttons = [roseButton, daisyButton, tulipButton];

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].size(100, 100);
        buttons[i].style('cursor', 'pointer');
        buttons[i].style('object-fit', 'contain');
        buttons[i].style('padding', '10px');
        buttons[i].style('background-color', 'white');
        buttons[i].style('border', '3px solid darkgreen');
        buttons[i].style('border-radius', '15px');
    }
}

function chooseFlower(flower) {

    if (!shareConnected) {
        console.log("Not connected yet");
        return;
    }

    selectedFlower = flower;

    // Send flower selection to host
    me.flower = selectedFlower;

    console.log("Selected flower: " + selectedFlower);
}

function draw() {
    background(0, 128, 0);

    textAlign(CENTER, CENTER);
    fill(255);

    textSize(26);
    text("Choose your flower", width / 2, 70);

    // Position the flower buttons
    roseButton.position(width / 2 - 50, 150);
    daisyButton.position(width / 2 - 50, 290);
    tulipButton.position(width / 2 - 50, 430);

    textSize(18);

    if (selectedFlower !== "") {
        text("Your flower: " + selectedFlower, width / 2, height - 45);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
