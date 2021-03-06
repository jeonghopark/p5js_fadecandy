// Connect to the local instance of fcserver
var WebSocketAddress = "ws://127.0.0.1:7890";
//Show LED pixel locations.
var showPixelLocations = true;
//Change the HTML Id of the canvas.
var canvasId = "strip64_flames"

var mic;

var im;

function setup() {
    var canvas = createCanvas(800, 200);
    canvas.id(canvasId);
    socketSetup(WebSocketAddress); // Connect to the local instance of fcserver via websocket.

    mic = new p5.AudioIn()
    mic.start();

    im = loadImage("images/flames.jpeg"); // Load a sample image	
    ledStrip(0, 22, width / 2, height / 6 * 1, width / 70, 0, false);
    ledStrip(22, 22, width / 2, height / 6 * 2, width / 70, 0, false);
    ledStrip(44, 22, width / 2, height / 6 * 3, width / 70, 0, false);
    ledStrip(66, 22, width / 2, height / 6 * 4, width / 70, 0, false);
    ledStrip(88, 22, width / 2, height / 6 * 5, width / 70, 0, false);
    frameRate(60);
}

function draw() {
    background(0);
    // Scale the image so that it matches the width of the window
    var imHeight = im.height * width / im.width;

    micLevel = mic.getLevel();

    // Scroll down slowly, and wrap around
    var speed = 0.05;
    var y = (millis() * -speed) % imHeight;

    // Use two copies of the image, so it seems to repeat infinitely  
    // image(im, 0, y, width, imHeight);
    // image(im, 0, y + imHeight, width, imHeight);

    fill(255);
    rect(0, height, width, map(micLevel, 0, 1, 0, -height) * 60);

    //Send to fcServer.
    drawFrame();
}