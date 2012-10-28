;(function($, window, undefined) {

	"use strict";

	/**
	 * Simple Banner constructor
	 * @param element
	 * @param options
	 * @constructor
	 */
	var Simplebanner = function(element, options) {
		this.element = element;
		this._paused = false;
		this._timer = {};
		this._currentBanner = {};
		this.options = $.extend({
			arrows: true,
			indicators: true,
			pauseOnHover: true,
			autoRotate: true,
			rotateTimeout: 5000,
			animTime: 300
		}, options);
		this.init();
	};

	Simplebanner.prototype.init = function() {
		if(this.options.indcators){
			this.buildIndicators();
		}
		if(!this.options.arrows){
			this.hideArrows();
		}
		if($(this.element).find('.bannerList li').length > 1 && this.options.autoRotate){
			this.startTimer();
		}
		this.bindEvents();
	};
	
	Simplebanner.prototype.hideArrows = function() {
		$(this.element).addClass('hiddenArrows');
	};
	
	Simplebanner.prototype.bindEvents = function() {
		$(this.element).hover(
			function(){
				this.stopTimer();
			},
			function(){
				this.startTimer();
			}
		);
	};
	
	Simplebanner.prototype.nextBanner = function() {
		var newCurr;
		if ($('#featuredListWpr .currFeat').next().length > 0) {
			newCurr = $('#featuredListWpr .currFeat').next();
		} else {
			newCurr = $('#featuredListWpr li').first();
		}
		$('#featuredListWpr .currFeat').removeClass('currFeat');
		var newSlide = parseInt($(newCurr).addClass('currFeat').index());
		var newMarg = newSlide * _featWidth;
		$('#slideIndicator .active').removeClass('active');
		$('#slideIndicator li:eq(' + newSlide + ')').addClass('active');
		$('#featuredListWpr ul').stop(false, true).animate({
			'marginLeft': -newMarg
		});
	};

	Simplebanner.prototype.featPrev = function() {
		var newCurr;
		if ($('#featuredListWpr .currFeat').prev().length > 0) {
			newCurr = $('#featuredListWpr .currFeat').prev();
		} else {
			newCurr = $('#featuredListWpr li').last();
		}
		$('#featuredListWpr .currFeat').removeClass('currFeat');
		var newSlide = parseInt($(newCurr).addClass('currFeat').index());
		var newMarg = newSlide * _featWidth;
		$('#slideIndicator .active').removeClass('active');
		$('#slideIndicator li:eq(' + newSlide + ')').addClass('active');
		$('#featuredListWpr ul').stop(false, true).animate({
			'marginLeft': -newMarg
		});
	};

	Simplebanner.prototype.goToSlide = function(slideIndex) {
		var newMarg = slideIndex * _featWidth;
		$('#featuredListWpr .currFeat').removeClass('currFeat');
		$('#slideIndicator .active').removeClass('active');
		$('#featuredListWpr li:eq(' + slideIndex + ')').addClass('currFeat');
		$('#slideIndicator li:eq(' + slideIndex + ')').addClass('active');
		$('#featuredListWpr ul').stop(false, true).animate({
			'marginLeft': -newMarg
		});
	};

	Simplebanner.prototype.buildBubbles = function() {
		$('#featuredListWpr .banner-slide').each(function(){
			$('#slideIndicator ul').append('<li class="featSlidebtn"></li>');
		});
	};

	Simplebanner.prototype.iniFeatured = function() {
		if ($('#featuredListWpr .banner-slide').length > 1) {
			buildBubbles();
			$('#slideIndicator').css({'display':'block'});
			$('#featuredListWpr li').first().addClass('currFeat');
			$('#slideIndicator li').first().addClass('active');
			_featWidth = $('#featuredListWpr ul li').width();
			$('#slideIndicator li').click(function () {
				if (!$(this).hasClass('active')) {
					goToSlide($(this).index());
				}
			});
			$('.featControlWpr').click(function () {
				switch ($(this).attr('id')) {
				case 'featControlsPrev':
					featPrev();
					break;
				case 'featControlsNext':
					nextBanner();
					break;
				};
			});
		}
	};

	Simplebanner.prototype.startTimer = function() {
		this.stopTimer();
		this._timer = setTimeout("nextBanner();",this.options.rotateTimeout); // change this one
	};

	Simplebanner.prototype.stopTimer = function() {
		clearTimeout(this._timer);
	};

	Simplebanner.prototype.nextBanner = function() {
		this.nextBanner();
		this.startTimer();
	};

	$.fn.simplebanner = function(options) {
		var method, args, ret = false;
		if (typeof options === "string") {
			args = [].slice.call(arguments, 0);
		}

		this.each(function() {
			var self = $(this);
			var instance = self.data("stickyInstance");
			
			if(!self.attr('id')){
				self.attr('id','simpleBanner-' + $.fn.simplebanner._instances.length+1);
			}
			
			if (instance && options) {
				if (typeof options === "object") {
					ret = $.extend(instance.options, options);
				} else if (options === "options") {
					ret = instance.options;
				} else if (typeof instance[options] === "function") {
					ret = instance[options].apply(instance, args.slice(1));
				} else {
					throw new Error('Simple Banner has no option/method named "' + method + '"');
				}
			} else {
				instance = new Simplebanner(self, options || {});
				self.data("stickyInstance", instance);
				$.fn.simplebanner._instances.push(instance);
			}
		});
		return ret || this;
	};

	$.fn.simplebanner._instances = [];

	// Deathstar death beam
	$(document).on("pageleave", function () {
		//$(window).unbind('scroll resize');
		$.fn.simplebanner._instances = [];
	});
}($, window));