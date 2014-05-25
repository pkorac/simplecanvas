/*
	Simple Canvas helper lib by Peter Koraca
*/
var SimpleCanvas = function SimpleCanvas(){
};


//////////////////////////////////////////////////

// Object.create fallback implementation
SimpleCanvas.prototype.ocFallback = function(){
	if( typeof Object.create !== 'function' ){
		Object.create = function (o) {
	        function F() {}
	        F.prototype = o;
	        return new F();
	    };
	}
}


//////////////////////////////////////////////////

// Setup the request animation frame

SimpleCanvas.prototype.setupAnimFrame = function(){
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	 
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	 
	// MIT license
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
}

//////////////////////////////////////////////////

// Setup the canvas


SimpleCanvas.prototype.canvas = function( canvasid ){

	this.ocFallback();
	this.setupAnimFrame();

	// SimpleCanvas
	this.canvas = document.getElementById( canvasid ); // actual canvas
	this.offCanvas = document.createElement('canvas'); // offscreen canvas

	this.realContext = this.canvas.getContext('2d'); // the actual context
	this.context = this.offCanvas.getContext('2d'); // offscreen context - the one you actually draw to
	
	// Canvas supported, let's go
	if ( this.realContext && this.context ){
		
		// Setup the canvas sizing and retina support
		var canvasHolder = document.getElementById('canvas-holder');
		
		var holderWidth = canvasHolder.offsetWidth;
		var holderHeight = canvasHolder.offsetHeight;

		// real
		this.canvas.width = holderWidth;
		this.canvas.height = holderHeight;
		
		// offscreen
		this.offCanvas.width = holderWidth;
		this.offCanvas.height = holderHeight;
		

		// add width and height properties
		this.realContext.width = holderWidth;
		this.realContext.height = holderHeight;
		
		this.context.width = holderWidth;
		this.context.height = holderHeight;		

		
		// Retina
		if ( window.devicePixelRatio ){

			var ratio = window.devicePixelRatio;
			
			
			// real
			this.canvas.width = holderWidth * ratio;
			this.canvas.height = holderHeight * ratio;
						
			// offscreen
			this.offCanvas.width = holderWidth * ratio;
			this.offCanvas.height = holderHeight * ratio;
			
	
			// add width and height properties
			this.realContext.width = holderWidth;
			this.realContext.height = holderHeight;
			
			this.context.width = holderWidth;
			this.context.height = holderHeight;			
			
			
			
			this.realContext.scale( ratio, ratio);
			this.context.scale( ratio, ratio );

			
		}
		
		
		

		(function( realContext, offContext){
		
			
			window.onresize = function(){
				
				// Setup the canvas sizing and retina support
				var canvasHolder = document.getElementById('canvas-holder');
				
				var holderWidth = canvasHolder.offsetWidth;
				var holderHeight = canvasHolder.offsetHeight;
		
				// real
				this.canvas.width = holderWidth;
				this.canvas.height = holderHeight;
				
				// offscreen
				this.offCanvas.width = holderWidth;
				this.offCanvas.height = holderHeight;
				
		
				// add width and height properties
				this.realContext.width = holderWidth;
				this.realContext.height = holderHeight;
				
				this.context.width = holderWidth;
				this.context.height = holderHeight;		
		
				
				// Retina
				if ( window.devicePixelRatio ){
		
					var ratio = window.devicePixelRatio;
					
					
					// real
					this.canvas.width = holderWidth * ratio;
					this.canvas.height = holderHeight * ratio;
								
					// offscreen
					this.offCanvas.width = holderWidth * ratio;
					this.offCanvas.height = holderHeight * ratio;
					
			
					// add width and height properties
					this.realContext.width = holderWidth;
					this.realContext.height = holderHeight;
					
					this.context.width = holderWidth;
					this.context.height = holderHeight;
					
					
					// no scaling because it's 'additive'
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
				_rctx.drawImage( _offcanvas, 0, 0, _octx.width, _octx.height );
				
			}();
			
		};
		
		return this;
	} else {
		return null;
	}
};

// Global pollution
var sc = new SimpleCanvas();

// Have fun