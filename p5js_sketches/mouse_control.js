// Connect to the local instance of fcserver
var WebSocketAddress = "ws://127.0.0.1:7890";
//Show LED pixel locations.
var showPixelLocations = true;
//Change the HTML Id of the canvas.
var canvasId = "grid8x8_dot";


//Canvas
function setup() {
    var canvas = createCanvas(640, 360);
    canvas.id(canvasId);
    socketSetup(WebSocketAddress);

    // Load a sample image
    dot = loadImage("images/dot.png");

    let step = 30;
    ledStrip(0, 22, width / 2, height / 6 * 1, width / step, 0, false);
    ledStrip(22, 22, width / 2, height / 6 * 2, width / step, 0, false);
    ledStrip(44, 22, width / 2, height / 6 * 3, width / step, 0, false);
    ledStrip(66, 22, width / 2, height / 6 * 4, width / step, 0, false);
    ledStrip(88, 22, width / 2, height / 6 * 5, width / step, 0, false);
    frameRate(60);
}

function draw() {
    background(0);

    // Draw the image, centered at the mouse location
    var dotSize = height * 0.7;
    image(dot, mouseX - dotSize / 2, mouseY - dotSize / 2, dotSize, dotSize);
    drawFrame();
}