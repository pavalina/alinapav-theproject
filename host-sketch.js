
let rose;
let daisy;
let tulip;

let room = "flower-garden";

function preload() {
    rose = loadImage("ProjectRose.png");
    daisy = loadImage("Daisy.png");
    tulip = loadImage("Tulip.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Find the server address
    let host = new URLSearchParams(window.location.search).get("shareHost");

    if (!host) {
        host = window.CLASS_SHARE_HOST || "";
    }

    // Join the same room as the phones
    if (host) {
        shareSetup({
            host: host,
            room: room,
            me: { role: "host" }
        });

        enableShareTap("Start the garden");

        // Make a QR code for the phone page
        let phoneUrl = new URL("index.html", window.location.href);

        phoneUrl.searchParams.set("shareHost", host);
        phoneUrl.searchParams.set("room", room);

        showDesktopQr({
            url: phoneUrl.toString(),
            label: "Scan to choose a flower"
        });
    }
}

function draw() {
    background(200, 255, 200);

    textAlign(CENTER, CENTER);
    fill(50);

    textSize(35);
    text("Our Flower Garden", width / 2, 60);

    // Find all connected phones
    let phones = guests.filter(function(phone) {
        return phone.role === "phone";
    });

    textSize(20);
    text(
        phones.length + " people have joined",
        width / 2,
        110
    );

    // Display each person's chosen flower
    for (let i = 0; i < phones.length; i++) {

        let x = width / 4 + (i % 4) * (width / 4);
        let y = 230 + Math.floor(i / 4) * 190;

        imageMode(CENTER);

        if (phones[i].flower === "Rose") {
            image(rose, x, y, 130, 130);
        }

        if (phones[i].flower === "Daisy") {
            image(daisy, x, y, 130, 130);
        }

        if (phones[i].flower === "Tulip") {
            image(tulip, x, y, 130, 130);
        }
    }

    if (phones.length === 0) {
        textSize(20);
        text("Waiting for people to join...", width / 2, height / 2);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
