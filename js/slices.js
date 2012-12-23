var Slices = (function(){
	
  "use strict";

  var console = window.console || window.alert;
  
  var SPEED = '1s';
  var MUST_RENEW = true;
	
  function Slices(element) {
    this.element = element;
    this.bind();
    this.layout();
    this.initAnimation();
  }

  Slices.prototype.bind = function() {
    var that = this;
    this.onResize = function(e) {
      that.resize(e);
    };
    window.addEventListener('resize', this.onResize, false);
  };

  
  /**
   * Handle window resize.
   */
  Slices.prototype.resize = function(e) {
    this.layout();
  };

  /**
   * Layout elements based on container
   * elements width.
   */
  Slices.prototype.layout = function() {
    var width = this.element.offsetWidth,
        lists = this.element.children,
        items;

    for(var i=0; i<lists.length; i++) {
      lists[i].style.width = width*lists[i].childElementCount + 'px';
      lists[i].style.display = 'block';

      items = lists[i].children;
      for(var j=0; j<items.length; j++) {
        items[j].style.width = width + 'px';
      }
    }
  };

  /**
   * Setup animations.
   */
  Slices.prototype.initAnimation = function() {
    var lists = this.element.children;

    for(var i=0; i<lists.length; i++) {
      lists[i].style[prefix('transition')] = 'all ' + SPEED;
    }
  };

  /**
   * Randomize items.
   */
  Slices.prototype.randomize = function() {
    var lists = this.element.children,
        randomItemIndex;

    for(var i=0; i<lists.length; i++) {
      if(MUST_RENEW) {
        // TODO
      }
      randomItemIndex = Math.floor( Math.random() * lists[i].childElementCount );
      show(lists[i], randomItemIndex);
    }
    return this;
  };

  /**
   * Clean up after us.
   */
  Slices.prototype.destroy = function() {
    this.element.removeEventListener('resize', this.onResize, false);
  };

  /**
   * Hide items, in a cool kinda way.
   */
  Slices.prototype.hide = function() {
    // TODO
  };

  /**
   * Show item in given list with given index (0 based)
   */
  function show(list, itemIndex) {
    var translateTo = list.children[itemIndex].offsetWidth*itemIndex;
    list.style[prefix('transform')] = 'translate(-' + translateTo + 'px, 0)';
  }

  /**
   * Can browser handle what we need?
   */
  function isCapable() {
    return 'WebkitTransform' in document.body.style ||
           'MozTransform' in document.body.style ||
           'msTransform' in document.body.style ||
           'OTransform' in document.body.style ||
           'transform' in document.body.style;
  }

  /**
   * Prefixes a style property with the correct vendor.
   */
  function prefix( property, el ) {
      var propertyUC = property.slice( 0, 1 ).toUpperCase() + property.slice( 1 ),
      vendors = [ 'Webkit', 'Moz', 'O', 'ms' ];

    for( var i = 0, len = vendors.length; i < len; i++ ) {
      var vendor = vendors[i];

      //if( typeof document.body.style[ vendor + propertyUC ] !== 'undefined' ) {
      if(vendor + propertyUC in document.body.style) {
        return vendor + propertyUC;
      }
    }

    return property;
  }


  return {
		create: function(element) {
      if(isCapable()) {
        return new Slices(element);
      }
      
    }
	};

})();
