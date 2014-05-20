// Simple Vector Class
var Vector = function(x, y) {
	this.x = x;
	this.y = y;
}

Vector.prototype.add = function(v) {
	this.x += v.x;
	this.y += v.y;
	return this;
}

Vector.prototype.subtract = function(v) {
	this.x -= v.x;
	this.y -= v.y;
	return this;
}

Vector.prototype.scale = function(s) {
	this.x *= s;
	this.y *= s;	
	return this;
}

Vector.prototype.magnitude = function() {
	return Math.sqrt( (this.x * this.x) + (this.y * this.y) );
}

Vector.prototype.magnitudeSqr = function(){
	return (this.x * this.x) + (this.y * this.y);
}

Vector.prototype.normalise = function() {
	var invMag = 1 / (this.magnitude() || 1);
	this.x *= invMag;
	this.y *= invMag;
	return this;
}

Vector.prototype.toString = function(){
	return ('x: '+ this.x + ' y: ' + this.y);
}