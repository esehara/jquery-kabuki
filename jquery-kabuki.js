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
                };
                options = this._initialize(options, defaults);

                setInterval(function() {
                    var _css_config = {};
                    _css_config[options.css] = me._randrgb(options.color);
                    me._element.css(_css_config);
                }, options.interval);

                return me;
            },

            earthquake: function(options) {
                var me = this;
                var defaults = {
                    'css': 'padding',
                    'interval': 100,
                    'max': 100,
                    'min': 0
                };
                options = this._initialize(options, defaults);

                setInterval(function(){
                    var _css_config = {};
                    _css_config[options.css] = me._randint({max: options.max, min: options.min});
                    me._element.css(_css_config);
                }, options.interval);

                return me;
            },

            bound: function(options) {
                var me = this;
                var defaults = {
                    'css': 'font-size',
                    'interval': 50,
                    'max': 72,
                    'min': 8,
                    'start': 16,
                    'reverse': false};
                options = this._initialize(options, defaults);

                setInterval(function() {
                    var _css_config = {};
                    var _status = options;
                    if (_status.reverse) { 
                        _status.start --;
                    } else {
                        _status.start ++;
                    }

                    if (_status.start > _status.max) {
                        _status.reverse = true;
                    }

                    if (_status.start < _status.min) {
                        _status.reverse = false;
                    }
                    _css_config[_status.css] = _status.start;
                    me._element.css(_css_config); 
                }, options.interval);
            },

            _background_size: function(me, options) {
                var background_url = $(me._element).css('background-image');
                var url = background_url.replace('url(', '').replace(')', '').replace('"', '').replace("'", "");
                var image = $('<img />');
                image.hide();

                image.bind('load', function() {
                    var width = $(this).width();
                    me._after_infinity_scroll(me, options, width);
                });

                $('body').append(image);
                image.attr('src', url);
            },

            _pre_infinity_scroll: function(options) {
                var me = this;
                var defaults = {'speed': 10};

                options = this._initialize();
                this._background_size(me, options);
            },

            _after_infinity_scroll: function(me, options, width) {
                var current = 0;
                setInterval(function() {
                    current ++;
                    $(me._element).css("backgroundPosition", current + "px 0");
                    if (current > width) {
                        current = 0;
                    }
                }, options.interval);
            },

            infinity_scroll: function(options) {
                this._pre_infinity_scroll(options);
            },

        };
    return _kabuki;
    };
}(jQuery));
