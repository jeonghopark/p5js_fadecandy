var WebSocketAddress = "ws://127.0.0.1:7890"; 
var showPixelLocations = true; 
var canvasId = "strip64_flames"

var im;

function setup(){
	var canvas = createCanvas(800, 200);
	canvas.id(canvasId);
	socketSetup(WebSocketAddress); // Connect to the local instance of fcserver via websocket.
	
	
	im = loadImage("images/flames.jpeg"); // Load a sample image	
	ledStrip(0, 22, width/2, height/6 * 1, width/70, 0, false);
	ledStrip(22, 22, width/2, height/6 * 2, width/70, 0, false);
	ledStrip(44, 22, width/2, height/6 * 3, width/70, 0, false);
	ledStrip(66, 22, width/2, height/6 * 4, width/70, 0, false);
	ledStrip(88, 22, width/2, height/6 * 5, width/70, 0, false);
	frameRate(60);
}

function draw() {
  
	// Scale the image so that it matches the width of the window
	var imHeight = im.height * width / im.width;

	// Scroll down slowly, and wrap around
	var speed = 0.05;
	var y = (millis() * -speed) % imHeight;
  
	// Use two copies of the image, so it seems to repeat infinitely  
	image(im, 0, y, width, imHeight);
	image(im, 0, y + imHeight, width, imHeight);
  
	//Send to fcServer.
	drawFrame();
}