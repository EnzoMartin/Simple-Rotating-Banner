Simple-Rotating-Banner
======================

A very simple rotating banner jQuery plugin

Usage
-----

### Element init

Just call `$('#element').simplebanner();` to initialize the plugin on the element of your choice, make sure the element has the following HTML mark-up:

```html
<div class="simpleBanner">
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
You can place anything you want inside the `<li>`, just remember that it uses `overflow:hidden` on the container


### Available options

* `indicators` defaults to `true` - This will add slide indicators at the bottom of the banner rotater
* `pauseOnHover` defaults to `true` - This will make the banner rotater pause when you hover over it with the mouse if `autoRotate` is enabled
* `autoRotate` defaults to `true` - This will make it rotate through all the banners automatically
* `rotateTimeout` defaults to `5000` (5 seconds) - If `autoRotate` is enabled, this controls how long each banner displays before going to the next one
* `animTime` defaults to `300` (0.3 seconds) - This controls the speed at which the rotation animation happens

Requirements
------------

jQuery is needed, tested on 1.7+. You'll also need the included CSS file, feel free to customize it to what you need. It's recommended you have a width set to the `<li>` for the banners, if not, it'll use the width of the container if it can't get the `<li>` width

Enjoy!

## License

Copyright (c) 2010-2013 Marcus Ekwall

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
