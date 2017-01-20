Simple-Rotating-Banner
======================

A very simple rotating banner jQuery plugin, minimal CSS and JS

### Usage:

- Download from [GitHub][download], or `npm install simple-rotating-banner` if you're using [NPM][npm]
- Include jQuery, Simple Banner JS, and Simple Banner CSS
- Invoke Simple Banner on the desired DOM element(s)

Just call `$('#rotating').simplebanner();` to initialize the plugin on the element of your choice, make sure the element has the following HTML mark-up:

```html
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="jquery.simplebanner.min.js"></script>
<link type="text/css" href="jquery.simplebanner.css" rel="stylesheet"/>

<div id="rotating" class="simpleBanner">
	<div class="bannerListWpr">
		<ul class="bannerList">
			<!-- LI list goes here -->
			<li><img src="samples/image1.jpg" /></li>
			<li><img src="samples/image2.jpg" /></li>
			<li><img src="samples/image3.jpg" /></li>
			<li><img src="samples/image4.jpg" /></li>
			<li><img src="samples/image5.jpg" /></li>
			<li><img src="samples/image6.jpg" /></li>
		</ul>
	</div>
	<div class="bannerControlsWpr bannerControlsPrev"><div class="bannerControls"></div></div>
	<div class="bannerIndicators"><ul></ul></div>
	<div class="bannerControlsWpr bannerControlsNext"><div class="bannerControls"></div></div>
</div>
```

*Note:* You can place anything you want inside the `<li>`, just remember that it uses `overflow:hidden` on the container


### Options:

| Name  | Default | Description |
| ------------- | ------------- | ------------- |
| indicators | `true` | Adds slide indicators at the bottom |
| autoRotate | `true` | Automatically rotate through all the banners |
| maxRotations | `null` | If `autoRotate` is `true`, stop auto-rotating after all slides have rotated through X times |
| pauseOnHover | `true` | If `autoRotate` is `true`, hovering the mouse over a banner will pause the timer |
| rotateTimeout | `5000` | If `autoRotate` is `true`, this controls how long each banner displays before going to the next one, in `ms` |
| animTime | `300` | Controls the speed at which the rotation animation happens, in `ms` |
| onChange | `null` | A callback function called when the slide changes. The function is passed one parameter, the index of the banner that is about to be displayed. |

### Requirements

jQuery is needed, tested on 1.7+. You'll also need the included CSS file.

It's recommended you have a width set to the `<li>` for the banners, if not, it'll use the width of the container if it can't get the `<li>` width

## License

The MIT License (MIT)

Copyright (c) 2016 Enzo Martin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm]:https://www.npmjs.com/
[download]:https://github.com/EnzoMartin/Simple-Rotating-Banner/releases/latest