/*
    rbar-misc.js  //  ralf-bartsch.net  //  2018-04-04

    license and info: https://github.com/r84r/js-lib-rbar
*/


var rbar = (function(ns) {
    
    ns.dom = (function(ns) {
        
        /*
        Funktion nach kompletten Laden der Seite ausführen
        */
        ns.ready = function(fn) {
            if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading")
                fn();
            else
                document.addEventListener('DOMContentLoaded', fn);
        }

        /*
        Ereignis auslösen
        */
        ns.trigger = function(el, eventName, eventParam) {
            if (arguments.length == 2) {
                var event = document.createEvent('HTMLEvents');
                event.initEvent(eventName, true, false);
            } else {
                if (window.CustomEvent) {
                    var event = new CustomEvent(eventName, {detail: {some: eventParam}});
                } else {
                    var event = document.createEvent('CustomEvent');
                    event.initCustomEvent(eventName, true, true, {some: eventParam});
                }        
            }
            el.dispatchEvent(event);
        }

        /*
        Gibt den Typ eines Objektes zurück
        */
        ns.type = function(obj) {
            return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
        }
        
        return ns;

    })({});
    
    return ns;
    
})(rbar || {})