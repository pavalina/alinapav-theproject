
let Rose;
let Daisy;
let Tulip;

let room = "a1-maple";

function preload() {
    Rose = loadImage("Rose.png");
    Daisy = loadImage("Daisy.png");
    Tulip = loadImage("Tulip.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Find the server address
    let host = new URLSearchParams(window.location.search).get("shareHost");

    if (!host) {
        host = window.CLASS_SHARE_HOST || "https://p5-phone-share.npuckett.workers.dev";
    }

    // Join the same room as the phones
    shareSetup({
        host: host,
        room: room,
        app: 'flower-garden',
        me: { role: "host" }
    });

    enableShareTap("Start the garden");

    console.log("Host server:", host);
    console.log("Host room:", room);

    // Make a QR code for the phone page
    let phoneUrl = new URL("index.html", window.location.href);

    phoneUrl.searchParams.set("shareHost", host);
    phoneUrl.searchParams.set("room", room);
    phoneUrl.searchParams.set("app", "flower-garden");

    showDesktopQr({
        url: phoneUrl.toString(),
        label: "Scan to choose a flower"
    });
}

// Check when the host connects
function shareReady() {
    console.log("Host connected successfully!");
}

function draw() {
    background(0, 128, 0);

    textAlign(CENTER, CENTER);
    fill(50);

    textSize(35);
    text("Community Flower Garden", width / 2, 60);

    // Find all connected phones
    let phones = guests.filter(function(phone) {
        return phone.number !== undefined;
    });

    textSize(20);
    text(
        phones.length + " Flowers In Garden",
        width / 2,
        110
    );

    // Display each person's chosen flower
    for (let i = 0; i < phones.length; i++) {

        let x = width / 4 + (i % 4) * (width / 4);
        let y = 230 + Math.floor(i / 4) * 190;

        imageMode(CENTER);

        if (phones[i].flower === "Rose") {
            image(Rose, x, y, 130, 130);
        }

        if (phones[i].flower === "Daisy") {
            image(Daisy, x, y, 130, 130);
        }

        if (phones[i].flower === "Tulip") {
            image(Tulip, x, y, 130, 130);
        }
    }

    if (phones.length === 0) {
        textSize(20);
        text("Waiting For The Garden To Flourish", width / 2, height / 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
