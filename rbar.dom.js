/*
    rbar.dom.js  //  ralf-bartsch.net  //  2018-07-09

    license and info: https://github.com/r84r/js-lib-rbar
    
    
    Vereinfachung von DOM-Zugriffen
    
    Achtung: Es wird keine Überprüfung übergebener Parameter druchgeführt
             -> z.B. führen nicht vorhandene Elemente zu einem Fehler
*/

var rbar = (function(ns) {
    
    ns.dom = (function(ns) {

        /**********************************************************************
          Effekte
        **********************************************************************/

        /*
        Element verstecken oder zeigen
        */
        ns.hide = function(el) {
            el.style.display = 'none';
        }
        ns.show = function(el) {
            el.style.display = '';
        }


        /**********************************************************************
          CSS
        **********************************************************************/

        /*
        Klasse prüfen, hinzufügen oder entfernen
        -> nur bis IE9 nötig, ab IE10 wird classList unterstützt
        */
        ns.hasClass = function(el, className) {
            if (el.classList)
                el.classList.contains(className)
            else
                new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
        }
        ns.addClass = function(el, className) {
            if (el.classList)
                el.classList.add(className)
            else
                el.className += ' ' + className
        }
        ns.removeClass = function(el, className) {
            if (el === undefined) return;
            if (el.classList)
                el.classList.remove(className)
            else
                el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
        /*
        Klasse umschalten
        */
       ns.toggleClass = function(el, className) {
            if (el.classList) 
                el.classList.toggle(className)
            else {
                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);
                if (existingIndex >= 0)
                    classes.splice(existingIndex, 1)
                else
                    classes.push(className)
                el.className = classes.join(' ');
            }
        }

        /*
        CSS auf alle Elemente eines Selektors applizieren. 
        Bsp: selectors='div.home, a.start', styles={float:'left',color:'blue'}
        */
        ns.setStyles = function(selectors, styles) {
            var el;
            if ((typeof selectors) == 'string')
                el = document.querySelectorAll(selectors)
            else
                el = selectors;
            for(i=0; i<el.length; i++)
                for (var s in styles)
                    el[i].style[s] = styles[s];
        }

        /**********************************************************************
          Elemente
        **********************************************************************/

        /*
        Position auf Elternelement bezogen
        */
        ns.position = function(el) {
            return {left: el.offsetLeft,
                    top: el.offsetTop};
        }
        /*
        Position auf komplette Seite bezogen
        */
        ns.offset = function(el) {
            var rect = el.getBoundingClientRect();
            return {top: rect.top + document.body.scrollTop,
                    left: rect.left + document.body.scrollLeft};
        }
        /*
        Position auf angezeigten Ausschnitt bezogen
        */
        ns.viewportPosition = function(el) {
            return el.getBoundingClientRect();
        }
        /*
        Höhe des Anzeigefensters (ohne Scrollleiste)
        */
        ns.viewportHeight = function() {
            return document.documentElement.clientHeight;
        }
        /*
        Weite des Anzeigefensters (ohne Scrollleiste)
        */
        ns.viewportWidth = function() {
            return document.documentElement.clientWidth;
        }
        /*
        Seitenverhältnis des Anzeigefesters (ohne Scrollleiste)
        */
        ns.viewportAspectRatio = function() {
            return (document.documentElement.clientWidth / document.documentElement.clientHeight);
        }

        ns.outerHeight = function(el, withMargin) {
            if (arguments.length === 2 && withMargin === true) {
                var height = el.offsetHeight;
                var style = getComputedStyle(el);
                height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            } else {
                var height = el.offsetHeight;
            }
            return height;
        }
        ns.outerWidth = function(el, withMargin) {
            if (arguments.length === 2 && withMargin === true) {
                var width = el.offsetWidth;
                var style = getComputedStyle(el);
                width += parseInt(style.marginLeft) + parseInt(style.marginRight);
            } else {
                var width = el.offsetWidth;
            }
            return width;
        }

        /*
        komplettes Element ersetzen (umschließenden Tag mit Inhalt)
        */
        ns.replaceWith = function(el, string) {
            el.outerHTML = string;
        }
        /*
        Inhalt eines Elements ersetzen (ohne umschließenden Tag)
        */
        ns.html = function(el, string) {
            el.innerHTML = string;
        }

        /*
        Attribut-Wert eines HTML-Tags erhalten. Gibt zwei Werte zurück
        -> empty: 'true' wenn nicht vorhanden oder leer
        -> value: String des Attributes ('' falls empty==true)
        */
        ns.getAttr = function(el, attr) {
            if (el.hasAttribute(attr)) {
                var r = el.getAttribute(attr);
                return {empty: (r === '' ? true : false), value: r};
            }
            return {empty: true, value: ''};
        }
        
        /*
        Sucht das nächste Elternelement
        */
        ns.closest = function(el, selector) {
            if (!el || !el.parentElement) return null
            else if (el.matches(selector)) return el
            else if (el.parentElement.matches(selector)) return el.parentElement
            else return ns.closest(el.parentElement, selector)
        }
        
        return ns;

    })({});
    
    return ns;
    
})(rbar || {})