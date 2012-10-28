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
		if(self.options.indicators){
			self.element.find('.bannerIndicators li').on({
				'mouseclick': function() {
					if (!$(this).hasClass('active')) {
						self.goToBanner($(this).index());
					}
				}
			});
		}
		if(self.options.arrows){
			self.element.find('.bannerControlsWpr').on({
				'mouseclick': function() {
					if($(this).hasClass('bannerControlsPrev')){
						self.previousBanner();
					} else {
						self.nextBanner();
					}
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
		var self = this;
		var indicatorUl = self.element.find('.bannerIndicators ul');
		self.element.find('.bannerList li').each(function(){
			indicatorUl.append('<li class="bannerIndicator"></li>');
		});
		indicatorUl.find('li:first').addClass('active');
	};

	Simplebanner.prototype.toggleTimer = function(timer) {
		var self = this;
		clearTimeout(self._timer);
		if(!timer){
			self._timer = setTimeout(function(){
				self.nextBanner().toggleTimer(false);
			},self.options.rotateTimeout);
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
		$.each($.fn.simplebanner._instances, function() {
			this.children().off();
		});
		$.fn.simplebanner._instances = [];
	});
}($, window));