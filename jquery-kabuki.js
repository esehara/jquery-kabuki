(function($) {
    $.fn.kabuki = function() {
    var _kabuki = {
            _element: this,
            _if_null: function(arg, defaults) {
                if (typeof arg === "undefined") {
                    arg = defaults;
                }
                return arg;
            },
            _randint: function(options) {
                options.min = this._if_null(options.min, 0);
                return (Math.floor(Math.random() * options.max) + options.min);
            },

            _randrgb: function(options) {
                var rgb_setting = this._if_null(options, {min: 0, max: 255});
                return 'rgb(' + this._randint(rgb_setting) + ',' + this._randint(rgb_setting) + ',' + this._randint(rgb_setting) + ')';
            },

            _initialize: function(valuables, defaults) {
                valuables = this._if_null(valuables, {});
                
                var key;
                for (key in defaults) {

                    if(defaults.hasOwnProperty(key)) {
                        valuables[key] = this._if_null(valuables[key], defaults[key]); 
                    }
                }

                return valuables;
            },

            rainbow: function(options) {
                var me = this;
                var defaults = {
                    'css': 'color',
                    'interval': 100,
                    'auto': true
                };
                options = this._initialize(options, defaults);

                setInterval(function() {
                    var _css_config = {};
                    _css_config[options.css] = me._randrgb(options.color);
                    me._element.css(_css_config);
                }, options.interval);

                return me;
            },

            start: function() {
                if (typeof this._setinterval !== "undefined") {
                    clearInterval(this._setinterval);
                }
                this._setinterval = setInterval(this._run, this._options.interval);
            },

            stop: function() {
                if (typeof this._setinterval !== "undefined") {
                    clearInterval(this._setinterval);
                }
            },

            _runner: function(me, options, func) {
                me._options = options;
                me._run = func;
                if (options.auto) {
                    me.start();
                }
                return me;
            },

            image_change: function(options) {
                var me = this;

                var defaults = {
                    'target': 'image',
                    'interval': 50,
                    'auto': true,
                    'random': false
                };
                options = this._initialize(options, defaults);
                me._images = options.images;
                me._image_length = options.images.length;
                me._pointer = 0;
                return this._runner(me, options, function() {
                    if (!me._options.random) {
                        me._pointer ++;
                        if (me._pointer >= me._image_length) {
                            me._pointer = 0;
                        }
                    }
                    me._element.attr({'src': me._images[me._pointer]});
                });

            },

            earthquake: function(options) {
                var me = this;
                
                var defaults = {
                    'css': 'padding',
                    'interval': 100,
                    'max': 100,
                    'min': 0,
                    'auto': true
                };
                options = this._initialize(options, defaults);
                return this._runner(me, options, function(){
                    var _css_config = {};
                    _css_config[options.css] = me._randint({max: options.max, min: options.min});
                    me._element.css(_css_config);
                });
            },

            bound: function(options) {
                var me = this;
                var defaults = {
                    'css': 'font-size',
                    'interval': 50,
                    'max': 72,
                    'min': 8,
                    'start': 16,
                    'rebound': true,
                    'reverse': false,
                    'auto': true};
                options = this._initialize(options, defaults);
                
                return this._runner(me, options, function() {
                    var _css_config = {};
                    var _status = options;
                    if (_status.reverse) { 
                        _status.start --;
                    } else {
                        _status.start ++;
                    }
                    
                    if (_status.rebound) {
                        if (_status.start > _status.max) {
                            _status.reverse = true;
                        }

                        if (_status.start < _status.min) {
                            _status.reverse = false;
                        }
                    }
                    _css_config[_status.css] = _status.start;
                    me._element.css(_css_config); 
                });
            },

            _background_size: function(me, options) {
                var background_url = $(me._element).css('background-image');
                var url = background_url.replace('url(', '').replace(')', '').replace('"', '').replace("'", "");
                var image = $('<img />');
                image.hide();
                var width = image.width();
                if (width === 0) {
                    image.bind('load', function() {
                        var width = $(this).width();
                        me._after_infinity_scroll(me, options, width);
                    }).attr('src', url);
                } else {
                    image.attr('src', url);
                    width = null;
                    me._after_infinity_scroll(me, options, width);
                }

                $('body').append(image);
            },

            _pre_infinity_scroll: function(options) {
                var me = this;
                var defaults = {
                    'speed': 10,
                    'interval': 10,
                    'auto': true};

                options = this._initialize(options, defaults);
                this._background_size(me, options);
            },

            _after_infinity_scroll: function(me, options, width) {
                var current;
                if (typeof current === "null") {
                    current = 0;
                } else {
                    current = width * -3; 
                }
                this._runner(me, options, function() {
                    current --;
                    $(me._element).css("backgroundPosition", current + "px 0");
                    if (current < 0 && current > (width * -2)) {
                        current = width;
                    }
                });
            },

            infinity_scroll: function(options) {
                this._pre_infinity_scroll(options);
            },

        };
    return _kabuki;
    };
}(jQuery));
