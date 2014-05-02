# SimpleCanvas
### HTML5 Canvas helper library by Peter Koraca
	
## Usage:

- include the `SimpleCanvas.js` script somewhere in your `<head>`
- Call `SimpleCanvas( canvasID, draw );` when the document/window loads
	- `canvasID`: canvas element id
	- `draw`: draw function that gets called on each animation frame (with one argument - context) – this is where you do all the drawing

SimpleCanvas `returns true` (if context was qcquired and `false` if not). Check out the [example.html](example.html) to see it in action.

---

The library also adds the following properties to the drawing context:

- `c.dt`: delta time passed since the last frame
- `c.width`: context width (changes on window resize)
- `c.height`: context height

SimpleCanvas makes use of [Paul Irish](http://paulirish.com/2011/requestanimationframe-for-smart-animating/)'s polyfill for request animation frame (se below).