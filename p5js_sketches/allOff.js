var WebSocketAddress = "ws://127.0.0.1:7890";
var showPixelLocations = true;
var canvasId = "grid8x8_dot";


//Canvas
function setup() {
    var canvas = createCanvas(640, 360);
    canvas.id(canvasId);
    socketSetup(WebSocketAddress);

    // Load a sample image
    // dot = loadImage("images/dot.png");

    let step = 40;
    ledStrip(0, 22, width / 2, height / 20 * 1, width / step, 0, false);
    ledStrip(22, 22, width / 2, height / 20 * 2, width / step, 0, false);
    ledStrip(44, 22, width / 2, height / 20 * 3, width / step, 0, false);
    ledStrip(66, 22, width / 2, height / 20 * 4, width / step, 0, false);
    ledStrip(88, 22, width / 2, height / 20 * 5, width / step, 0, false);
    frameRate(60);
}

function draw() {
    
    background(0);

    noStroke();
    fill(0, 0, 0);
    rect(0, 0, width, height);

    drawFrame();

}