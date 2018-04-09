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
    ledStrip(0, 60, width / 6 * 1, height / 6 * 3, width / 500, 0, true);
    ledStrip(60, 60, width / 6 * 2, height / 6 * 3, width / 500, 0, true);
    ledStrip(120, 60, width / 6 * 3, height / 6 * 3, width / 500, 0, false);
    ledStrip(180, 60, width / 6 * 4, height / 6 * 3, width / 500, 0, false);
    ledStrip(240, 60, width / 6 * 5, height / 6 * 3, width / 500, 0, false);
    frameRate(60);
}

function draw() {
    background(0);

    // Draw the image, centered at the mouse location
    var dotSize = height * 0.2;
    image(dot, mouseX - dotSize / 2, mouseY - dotSize / 2, dotSize, dotSize * 5);
    drawFrame();
}