Simple-Rotating-Banner
======================

A very simple rotating banner jQuery plugin

Usage
-----

### Element init

Just call `$('#element').simplebanner();` to initialize the plugin on the element of your choice

### Available options

* `indicators` defaults to `true` - This will add slide indicators at the bottom of the banner rotater
* `pauseOnHover` defaults to `true` - This will make the banner rotater pause when you hover over it with the mouse if `autoRotate` is enabled
* `autoRotate` defaults to `true` - This will make it rotate through all the banners automatically
* `rotateTimeout` defaults to `2500` (2.5 seconds) - If `autoRotate` is enabled, this controls how long each banner displays before going to the next one
* `animTime` defaults to `300` (0.3 seconds) - This controls the speed at which the rotation animation happens

Requirements
------------

jQuery is needed, tested on 1.7+. You'll also need the included CSS file, feel free to customize it to what you need. It's recommended you have a width set to the LIs for the banners, if not, it'll use the width of the container if it can't get the LI width

Enjoy!