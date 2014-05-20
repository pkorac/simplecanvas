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
	this.canvas = document.getElementById( canvasid ); // actual canvas
	this.offCanvas = document.createElement('canvas'); // offscreen canvas

	this.realContext = this.canvas.getContext('2d'); // the actual context
	this.context = this.offCanvas.getContext('2d'); // offscreen context - the one you actually draw to
	
	// Canvas supported, let's go
	if ( this.realContext && this.context ){
		
		// Setup the canvas sizing and retina support
		var canvasHolder = document.getElementById('canvas-holder');


		// real
		this.realContext.canvas.width = canvasHolder.offsetWidth;
		this.realContext.canvas.height = canvasHolder.offsetHeight;

		// offscreen
		this.context.canvas.width = canvasHolder.offsetWidth;
		this.context.canvas.height = canvasHolder.offsetHeight;	
		

		// add width and height properties
		this.realContext.width = this.context.canvas.width;
		this.realContext.height = this.context.canvas.height;
		
		this.context.width = this.context.canvas.width;
		this.context.height = this.context.canvas.height;				
		
		
		// Retina
		if ( window.devicePixelRatio ){

			// real
			this.realContext.canvas.width *= window.devicePixelRatio;
			this.realContext.canvas.height *= window.devicePixelRatio;
			// offscreen
			this.context.canvas.width *= window.devicePixelRatio;
			this.context.canvas.height *= window.devicePixelRatio;
			
			// real
			this.realContext.width = ( this.context.canvas.width / window.devicePixelRatio );
			this.realContext.height = ( this.context.canvas.height / window.devicePixelRatio );
			// offscreen			
			this.context.width = ( this.context.canvas.width / window.devicePixelRatio );
			this.context.height = ( this.context.canvas.height / window.devicePixelRatio );
			
			
			this.realContext.scale( window.devicePixelRatio, window.devicePixelRatio );
			this.context.scale( window.devicePixelRatio, window.devicePixelRatio );
		}

		(function( realContext, offContext){
			window.onresize = function(){
				
				realContext.canvas.width = canvasHolder.offsetWidth;
				realContext.canvas.height = canvasHolder.offsetHeight;
				
				offContext.canvas.width = canvasHolder.offsetWidth;
				offContext.canvas.height = canvasHolder.offsetHeight;
				
				
				realContext.width = realContext.canvas.width;
				realContext.height = realContext.canvas.height;
				
				offContext.width = offContext.canvas.width;
				offContext.height = offContext.canvas.height;
				
				if ( window.devicePixelRatio ){
					// real
					realContext.canvas.width *= window.devicePixelRatio;
					realContext.canvas.height *= window.devicePixelRatio;
					
					realContext.width = ( realContext.canvas.width / window.devicePixelRatio );
					realContext.height = ( realContext.canvas.height / window.devicePixelRatio );
					
					realContext.scale( window.devicePixelRatio, window.devicePixelRatio );
					
					// offscree
					offContext.canvas.width *= window.devicePixelRatio;
					offContext.canvas.height *= window.devicePixelRatio;
					
					offContext.width = ( offContext.canvas.width / window.devicePixelRatio );
					offContext.height = ( offContext.canvas.height / window.devicePixelRatio );
					
					offContext.scale( window.devicePixelRatio, window.devicePixelRatio );					
				}
			}
		})(this.realContext, this.context);


		// AnimateDraw
		// request animation frame and add dt		
		this.animateDraw = function( cb ){

			var _rctx = this.realContext;
			var _octx = this.context;
			var _offcanvas = this.offCanvas;
			
			var time;
			var draw = function draw(){
				
				window.requestAnimationFrame( draw );
				
				var now = new Date().getTime();
				_octx.dt = now - ( time || now );
				_rctx.dt = _octx.dt;
				time = now;
				
				cb(); // draw things (onto the offscreen canvas)
				
				// make the drawing visible
				_rctx.clearRect( 0, 0, _rctx.width, _rctx.height );
				_rctx.drawImage( _offcanvas, 0, 0 );
				
			}();
			
		};
		
		return this;
	} else {
		return null;
	}
};

// Have fun