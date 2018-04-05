/*
 * Simple Open Pixel Control client for P5js,
 * designed to sample each LED's color from some point on the canvas.
 *
 * Micah Elizabeth Scott, 2013
 * Ported to P5js by Matthew I. Kessler
 * This file is released into the public domain.
 */

/*
 *!!THIS SCRIPT MUST BE LOADED IN HTML BEFORE THE DRAW SCRIPT!!
 *
 *Example for HTML head:
 *<script src="libraries/opc.js" type="text/javascript"></script>
 *<script src="strip64_flames.js" type="text/javascript"></script>
 */

// Arrays for pixels[]'s locations to send rgb values to fcServer.
var pixelLocationsRed = [];
var pixelLocationsGre = [];
var pixelLocationsBlu = [];

// Arrays for to map pixels on screen.
var ledXpoints = [];
var ledYpoints = [];

// Enable locations on screen.
var enableShowLocations;

//New WebSocket.
var socket;

function OPC(){
	this.pixelLocationsRed = [];
	this.pixelLocationsGre = [];
	this.pixelLocationsBlu = [];
	this.ledXpoints = [];
	this.ledYpoints = [];
}

OPC.prototype.socketSetup = function(WebSocketAddress) {
	this.socket = new WebSocket(WebSocketAddress);
	enableShowLocations = true;
};

// Set the location of a single LED.
OPC.prototype.led = function(index, x, y) {
	loadPixels();
	if (this.pixelLocationsRed === null) {
		this.pixelLocationsRed.length = index + 1;
		this.pixelLocationsGre.length = index + 1;
		this.pixelLocationsBlu.length = index + 1;
		this.ledXpoints.length = index + 1;
		this.ledYpoints.length = index + 1;
	} else if (index >= this.pixelLocationsRed.length) {
		this.pixelLocationsRed.length = index + 1;
		this.pixelLocationsGre.length = index + 1;
		this.pixelLocationsBlu.length = index + 1;
		this.ledXpoints.length = index + 1;
		this.ledYpoints.length = index + 1;
	}
	//Store pixel[] map to color arrays.
	var pixelD = pixelDensity();
	var idx = pixelD*pixelD*4*y*width+x*pixelD*4;
	this.pixelLocationsRed[index] = (idx);
	this.pixelLocationsGre[index] = (idx + 1);
	this.pixelLocationsBlu[index] = (idx + 2);
	//Store x,y to draw points for pixel locations 
	this.ledXpoints[index] = x;
	this.ledYpoints[index] = y;
};

// Set the location of several LEDs arranged in a strip.
// Angle is in radians, measured clockwise from +X.
// (x,y) is the center of the strip.
OPC.prototype.ledStrip = function(index, count, x, y, spacing, angle, reversed) {
	var s = sin(angle);
	var c = cos(angle);
	for (var i = 0; i < count; i++) {
		this.led(
			reversed ? (index + count - 1 - i) * 1 : (index + i) * 1,
			//floor() These must be integers.  round() causes lag
			floor((x + (i - (count - 1) / 2.0) * spacing * c + 0.5) * 1),
			floor((y + (i - (count - 1) / 2.0) * spacing * s + 0.5) * 1));
	}
};



//Called in function draw(){...} on last line.
OPC.prototype.drawFrame = function() {
	if (this.pixelLocationsRed === null) {
		// No pixels defined yet
		return;
	}
	let leds = this.pixelLocationsRed.length;
	let packet = new Uint8ClampedArray(4 + leds * 3);

	if (this.socket.readyState != 1 /* OPEN */ ) {
		// The server connection isn't open. Nothing to do.
		return;
	}

	if (this.socket.bufferedAmount > packet.length) {
		// The network is lagging, and we still haven't sent the previous frame.
		// Don't flood the network, it will just make us laggy.
		// If fcserver is running on the same computer, it should always be able
		// to keep up with the frames we send, so we shouldn't reach this point.
		return;
	}

	// Dest position in our packet. Start right after the header.
	let dest = 4;
	loadPixels();

	// Sample and send the center pixel of each LED
	for (let led = 0; led < leds; led++) {
		let i = led;
		packet[dest++] = pixels[this.pixelLocationsRed[i]];
		packet[dest++] = pixels[this.pixelLocationsGre[i]];
		packet[dest++] = pixels[this.pixelLocationsBlu[i]];
	}
	this.socket.send(packet.buffer);

	//draw pixel locations on screen if enabled
	if (showPixelLocations === true) {
		for (i = 0; i < leds; i++) {
			stroke(127);
			//offset x+1 and y+1 so we don't send the dots to the fc Server
			point(this.ledXpoints[i]+1, this.ledYpoints[i]+1);
		}
	}
};