
// Simple Vector Class
SimpleCanvas.prototype.Vector = function(x, y) {
	this.x = x;
	this.y = y;
}

SimpleCanvas.prototype.Vector.prototype.add = function(v) {
	this.x += v.x;
	this.y += v.y;
	return this;
}

SimpleCanvas.prototype.Vector.prototype.subtract = function(v) {
	this.x -= v.x;
	this.y -= v.y;
	return this;
}

SimpleCanvas.prototype.Vector.prototype.scale = function(s) {
	this.x *= s;
	this.y *= s;	
	return this;
}

SimpleCanvas.prototype.Vector.prototype.magnitude = function() {
	return Math.sqrt( (this.x * this.x) + (this.y * this.y) );
}

SimpleCanvas.prototype.Vector.prototype.magnitudeSqr = function(){
	return (this.x * this.x) + (this.y * this.y);
}

SimpleCanvas.prototype.Vector.prototype.normalise = function() {
	var invMag = 1 / (this.magnitude() || 1);
	this.x *= invMag;
	this.y *= invMag;
	return this;
}

SimpleCanvas.prototype.Vector.prototype.toString = function(){
	return ('x: '+ this.x + ' y: ' + this.y);
}