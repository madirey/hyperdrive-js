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
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    };

    Plugin.prototype = {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
            console.log("xD");
        },
        yourOtherFunction: function () {
            // some logic
        }
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
