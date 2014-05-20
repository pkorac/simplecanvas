/*
	Simple Canvas helper lib by Peter Koraca
*/
var SimpleCanvas = function SimpleCanvas( canvasid ){

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
	this.canvas = document.getElementById( canvasid );
	this.context = this.canvas.getContext('2d');
	
	// Canvas supported, let's go
	if ( this.context ){
		
		// Setup the canvas sizing and retina support
		var canvasHolder = document.getElementById('canvas-holder');

		this.context.canvas.width = canvasHolder.offsetWidth;
		this.context.canvas.height = canvasHolder.offsetHeight;
		
		// add width and height properties
		this.context.width = this.context.canvas.width;
		this.context.height = this.context.canvas.height;
		
		
		if ( window.devicePixelRatio ){
			this.context.canvas.width *= window.devicePixelRatio;
			this.context.canvas.height *= window.devicePixelRatio;
			
			this.context.width = ( this.context.canvas.width / window.devicePixelRatio );
			this.context.height = ( this.context.canvas.height / window.devicePixelRatio );
			
			this.context.scale( window.devicePixelRatio, window.devicePixelRatio );
		}

		(function(c){
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
			}
		})(this.context);



		// request animation frame and add dt
		var _context = this.context;
		this.animateDraw = function animateDraw(cb){
			var time;
			var draw = function draw(){
				window.requestAnimationFrame( draw );
				var now = new Date().getTime();
				_context.dt = now - ( time || now );
				time = now;
				cb();
			}();
		}
		
		return this;
	} else {
		return null;
	}
};

// Have fun