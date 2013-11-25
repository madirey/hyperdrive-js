/*!
 * hyperdrive-js
 * https://github.com/mattcaldwell/hyperdrive-js
 *
 * Copyright (c) 2013 Matt Caldwell <matt.caldwell@gmail.com>
 *
 * Based on jQuery lightweight plugin boilerplate
 *   Original boilerplate author: @ajpiano
 *   Further changes, comments: @addyosmani
 *
 * Plugin by:
 * Matt Caldwell <matt.caldwell@gmail.com>
 * https://github.com/mattcaldwell/
 *
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function($, window, document, undefined) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the plugin defaults once
    var pluginName = 'hyperdrive',
        pluginId   = 'jq-plugin_' + pluginName,
        defaults   = {

        };

    // The actual plugin constructor
    var Plugin = function(element, options) {
        this.el = element;
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        // initialize plugin
        this.init();

        // set the plugin state to "initialized"
        Plugin.static.initialized = true;
    };

    Plugin.prototype = {
        init: function() {
            this.prefetch();
            this.interceptAjax();
        },
        prefetch: function() {
            var url          = this.$el.attr('href'),
                responseObj  = {};

            $.ajax({
                url: url,
                beforeSend: function (jqXHR, settings) {
                    // hold on to the 'url' so we can use it later
                    jqXHR.url = settings.url;
                }
            })
            .done(function (data, textStatus, jqXHR) {
                responseObj.data = data;
                responseObj.textStatus = textStatus;
                responseObj.jqXHR = jqXHR;
                localStorage['hjs-data-' + jqXHR.url] = data;
            });
        },
        interceptAjax: function() {
            // be sure to only create the handler once
            if(!Plugin.static.initialized) {
                var urlIndex, url, content;
                $(document).ajaxSend(function(evt, jqXHR, settings) {
                    data = localStorage['hjs-data-' + settings.url];
                    if(data !== undefined) {
                        // we have prefetched the content ... display it
                        jqXHR.done(data);
                        jqXHR.abort();
                    }
                });
            }
        },
    };

    // Class variables
    Plugin.static = {
        initialized: false
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if(!$.data(this, pluginId)) {
                $.data(this, pluginId, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
