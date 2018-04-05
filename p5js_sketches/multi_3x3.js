// Connect to the local instance of fcserver
var WebSocketAddress1 = "ws://192.168.1.231:7890";  // WLAN
var WebSocketAddress2 = "ws://192.168.1.232:7890";  // WLAN 
var WebSocketAddress3 = "ws://192.168.1.233:7890";  // WLAN 

// var WebSocketAddress1 = "ws://192.168.1.219:7890";  // Cable
// var WebSocketAddress2 = "ws://192.168.1.73:7890";  // Cable 
// var WebSocketAddress3 = "ws://192.168.1.4:7890";  // Cable 


//Show LED pixel locations.
var showPixelLocations = true; 
//Change the HTML Id of the canvas.
var canvasId = "strip64_flames"

var opc = [];

function setup(WebSocketAddress){
	var canvas = createCanvas(800, 200);
	canvas.id(canvasId);

	opc[0] = new OPC();
	opc[1] = new OPC();
	opc[2] = new OPC();

	opc[0].socketSetup(WebSocketAddress1); // Connect to the local instance of fcserver via websocket.
	opc[1].socketSetup(WebSocketAddress2); // Connect to the local instance of fcserver via websocket.
	opc[2].socketSetup(WebSocketAddress3); // Connect to the local instance of fcserver via websocket.


	dot = loadImage("images/dot.png");
	opc[2].ledStrip(0, 60, width/2, height/4 * 1, width/600, 0, false);
	opc[2].ledStrip(0, 120, width/2, height/4 * 1, width/600, 0, false);
	opc[2].ledStrip(0, 180, width/2, height/4 * 1, width/600, 0, true);
	opc[1].ledStrip(0, 60, width/2, height/4 * 2, width/600, 0, false);
	opc[1].ledStrip(0, 120, width/2, height/4 * 2, width/600, 0, false);
	opc[1].ledStrip(0, 180, width/2, height/4 * 2, width/600, 0, false);
	opc[0].ledStrip(0, 60, width/2, height/4 * 3, width/600, 0, true);
	opc[0].ledStrip(0, 120, width/2, height/4 * 3, width/600, 0, false);
	opc[0].ledStrip(0, 180, width/2, height/4 * 3, width/600, 0, false);
	frameRate(60);
};



function draw() {
	background(0);

	var dotSize = height * 1.7;
	tint(255,0,0);
  	image(dot, mouseX - dotSize/2, mouseY - dotSize/2, dotSize, dotSize);


	//Send to fcServer.
	opc[0].drawFrame();
	opc[1].drawFrame();
	opc[2].drawFrame();
};