let titleFont;
let regularFont;

let Rose;
let Aster;
let Lily;
let Hibiscus;
let Plumeria;
let Primrose;

let selectedFlower = "";

const SHARE_HOST = 'https://p5-phone-share.npuckett.workers.dev';
const ROOM = 'a1-maple';

let roseButton;
let asterButton;
let lilyButton;
let hibiscusButton;
let plumeriaButton;
let primroseButton;

function preload() {
    Rose = loadImage("Rose.png");
    Aster = loadImage("Aster.png");
    Lily = loadImage("Lily.png");
    Hibiscus = loadImage("Hibiscus.png");
    Plumeria = loadImage("Plumeria.png");
    Primrose = loadImage("Primrose.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    titleFont = "Dancing Script";
    regularFont = "Quicksand";

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
    asterButton = createImg("Aster.png", "Aster");
    lilyButton = createImg("Lily.png", "Lily");
    hibiscusButton = createImg("Hibiscus.png", "Hibiscus");
    plumeriaButton = createImg("Plumeria.png", "Plumeria");
    primroseButton = createImg("Primrose.png", "Primrose");

    // Make the images clickable
    roseButton.mousePressed(function() {
        chooseFlower("Rose");
    });

    asterButton.mousePressed(function() {
        chooseFlower("Aster");
    });

    lilyButton.mousePressed(function() {
        chooseFlower("Lily");
    });

    hibiscusButton.mousePressed(function() {
        chooseFlower("Hibiscus");
    });

    plumeriaButton.mousePressed(function() {
        chooseFlower("Plumeria");
    });

    primroseButton.mousePressed(function() {
        chooseFlower("Primrose");
    });

    // Style the flower images
    let buttons = [roseButton, asterButton, lilyButton, hibiscusButton, plumeriaButton, primroseButton];

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

    textFont(titleFont);
    textSize(60);
    text("Choose your flower", width / 2, 70);

    // Position the flower buttons
    roseButton.position(width / 2 - 190, 150);
    asterButton.position(width / 2 - 50, 150);
    lilyButton.position(width / 2 + 90, 150);
    hibiscusButton.position(width / 2 - 190, 350);
    plumeriaButton.position(width / 2 - 50, 350);
    primroseButton.position(width / 2 + 90, 350);

    textFont(regularFont);
    textSize(18);

    if (selectedFlower !== "") {
        text("Your Flower : " + selectedFlower, width / 2, height - 90);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
