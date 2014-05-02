/*
	Simple Canvas helper lib by Peter Koraca
	
	Usage:
	- include this script in your header
	- when document loads call SimpleCanvas( canvasID, draw );
	- SimpleCanvas accepts two arguments
		- canvasID: canvas element id
		- draw: draw callback function (with one argument - canvas)
	- SimpleCanvas returns true (if context was qcquired and false if not)
	
	
	SimpleCanvas adds the following properties to context:
	- c.dt delta time passed since the last frame
	- c.width context width (changes on window resize)
	- c.height context height

	SimpleCanvas makes use of Paul Irish's polyfill for request animation frame (se below).	
*/
var SimpleCanvas = function SimpleCanvas( canvas, draw ){
	
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	 
	// MIT license
	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());



	// SimpleCanvas
	var canvas = document.getElementById( canvas );
	var c = canvas.getContext('2d');
	
	if ( c ){
		var canvasHolder = document.getElementById('canvas-holder');

		c.canvas.width = canvasHolder.offsetWidth;
		c.canvas.height = canvasHolder.offsetHeight;
		
		c.width = c.canvas.width;
		c.height = c.canvas.height;
		
		
		if ( window.devicePixelRatio ){
			c.canvas.width *= window.devicePixelRatio;
			c.canvas.height *= window.devicePixelRatio;
			
			c.width = ( c.canvas.width / window.devicePixelRatio );
			c.height = ( c.canvas.height / window.devicePixelRatio );
			
			c.scale( window.devicePixelRatio, window.devicePixelRatio );
		}

		
		window.onresize = function(){
			c.canvas.width = canvasHolder.offsetWidth;
			c.canvas.height = canvasHolder.offsetHeight;
			
			c.width = c.canvas.width;
			c.height = c.canvas.height;
			
			if ( window.devicePixelRatio ){
				c.canvas.width *= window.devicePixelRatio;
				c.canvas.height *= window.devicePixelRatio;
				
				c.width = ( c.canvas.width / window.devicePixelRatio );
				c.height = ( c.canvas.height / window.devicePixelRatio );
				
				c.scale( window.devicePixelRatio, window.devicePixelRatio );
			}
			
		};
		
		
		// Request animaton
		var animateDraw = function animateDraw(cb){

			
			var time;
			var draw = function draw(){
				window.requestAnimationFrame( draw );
				var now = new Date().getTime();
				c.dt = now - ( time || now );
				time = now;
				cb(c);
			}();
			
			
		}
		animateDraw( draw );
		
		return true;
	} else {
		return false;
	}
};

// Have fun