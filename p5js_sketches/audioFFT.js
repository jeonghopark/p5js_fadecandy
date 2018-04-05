var WebSocketAddress = "ws://127.0.0.1:7890";
var showPixelLocations = false;
var canvasId = "strip64_flames"

var mic;

var im;

var ledBrightness = 200;

function setup() {
    var canvas = createCanvas(800, 200);
    canvas.id(canvasId);
    socketSetup(WebSocketAddress); // Connect to the local instance of fcserver via websocket.

    mic = new p5.AudioIn()
    mic.start();

    fft = new p5.FFT();
    fft.setInput(mic);

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

    var spectrum = fft.analyze(32);

    fill(0, ledBrightness, 0); // spectrum is green

    // beginShape();
    // for (let i = 0; i < spectrum.length; i++) {
    //     let x = map(i, )
    //     vertex(i, map(spectrum[i], 0, 255, height, 0));
    // }
    // endShape(CLOSE);

    for (let i = 0; i < 300; i++) {
        noStroke();
        // stroke(127);
        fill(ledBrightness, 0, 0);
        //offset x+1 and y+1 so we don't send the dots to the fc Server
        rect(ledXpoints[i] + 1 - 5, ledYpoints[i] + 1 - 5, 10, 10);
    }

    push();
    translate(26 * 4, 0);
    for (let i = 0; i < 32; i++) {
        noStroke();
        fill(0, ledBrightness, 0); // spectrum is green
        let x = map(i, 0, 32, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, 0);
        rect(x, height, width / 32, h * 0.8)
    }
    pop();

    drawFrame();

}