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
		this._bannerWidth = 0;
		this._bannerCount = 0;
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
		this._bannerCount = this.element.find('.bannerList li').length;
		this._bannerWidth = this.element.find('.bannerList li').outerWidth();
		this.currentBanner = this.element.find('.bannerList li:first').addClass('current');
		
		if(this.options.indicators){
			this.buildIndicators();
		} else {
			this.element.addClass('hiddenIndicators');
		}
		if(!this.options.arrows){
			this.element.addClass('hiddenArrows');
		}
		if(this._bannerCount > 1 && this.options.autoRotate){
			this.toggleTimer();
		}
		this.bindEvents();
	};
	
	Simplebanner.prototype.bindEvents = function() {
		var self = this;
		if(this.options.indicators){
			this.element.find('.bannerIndicators li').click(function() {
				if (!$(this).hasClass('active')) {
					this.goToBanner($(this).index());
				}
			});
		}
		if(this.options.arrows){
			this.element.find('.bannerControlsWpr').click(function() {
				if($(this).hasClass('bannerControlsPrev')){
					this.previousBanner();
				} else {
					this.nextBanner();
				}
			});
		}
		if(self.options.pauseOnHover){
			self.element.on({
				"mouseenter": function() {
					self.toggleTimer(true);
				},
				"mouseleave": function() {
					self.toggleTimer(false);
				}
			});
		}
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

	Simplebanner.prototype.previousBanner = function() {
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

	Simplebanner.prototype.goToBanner = function(slideIndex) {
		var newMarg = slideIndex * _featWidth;
		$('#featuredListWpr .currFeat').removeClass('currFeat');
		$('#slideIndicator .active').removeClass('active');
		$('#featuredListWpr li:eq(' + slideIndex + ')').addClass('currFeat');
		$('#slideIndicator li:eq(' + slideIndex + ')').addClass('active');
		$('#featuredListWpr ul').stop(false, true).animate({
			'marginLeft': -newMarg
		});
	};

	Simplebanner.prototype.buildIndicators = function() {
		$('#featuredListWpr .banner-slide').each(function(){
			$('#slideIndicator ul').append('<li class="featSlidebtn"></li>');
		});
	};

	Simplebanner.prototype.iniFeatured = function() {
		if ($('#featuredListWpr .banner-slide').length > 1) {
			buildIndicators();
			$('#slideIndicator').css({'display':'block'});
			$('#featuredListWpr li').first().addClass('currFeat');
			$('#slideIndicator li').first().addClass('active');
			_featWidth = $('#featuredListWpr ul li').width();
			
		}
	};

	Simplebanner.prototype.toggleTimer = function(timer) {
		var self = this;
		if(!timer){
			clearTimeout(self._timer);
			self._timer = setTimeout(function(){
				self.nextBanner();
				self.toggleTimer(false);
			},self.options.rotateTimeout);
		} else {
			clearTimeout(self._timer);
		}
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