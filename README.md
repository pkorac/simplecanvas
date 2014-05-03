# SimpleCanvas
### HTML5 Canvas helper library by Peter Koraca
	
## Usage:

- include the `SimpleCanvas.js` script somewhere in your `<head>`
- Create a `new SimpleCanvas( canvasID );` instance when the document/window loads (where the canvasID is the id of your canvas element)

Simple canvas exposes the following properties and methods:

- `context`: the drawing context (this is where you draw)
- `width` and `height`: the drawing context's width and height (also recalculated on window resize)
- `animateDraw( draw )`: calls your draw function on every requestAnimationFrame or cca. 16ms (if the browser doesn't support it)
- `dt`: time passed since the last frame when animating

SimpleCanvas `returns SimpleCanvas` instance (if context was qcquired and `null` if not).


## Example

Check out the [example.html](example.html) to see it in action.


---

SimpleCanvas makes use of [Paul Irish](http://paulirish.com/2011/requestanimationframe-for-smart-animating/)'s polyfill for request animation frame (se below).