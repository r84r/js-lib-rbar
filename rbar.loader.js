/*
    rbar.loader.js  //  ralf-bartsch.net  //  2018-07-09

    license and info: https://github.com/r84r/js-lib-rbar

    
    Vereinfachung des Vorladens von Ressourcen
    -> momentan nur Skripte und Bilder
    -> rbar.loader als Variable deklariert werden
    -> loader.start sowie loader.load müssen am Ende des HTML-Codes und
       vor </body> aufgerufen werden
    -> mit loader.start wird der Preloader gezeigt
    -> mit window.addEventListener('load', loader.close) kann der 
       Preloader ausgeblendet werden
*/

var rbar = (function(ns) {

    ns.loader = (function(ns) {

        let _container,
            _text,
            _startTime,
            _imgInMem = [];
        ns.images  = [];
        ns.scripts = [];

        ns.addImage = function(path) {
            images.push(path);
        }
        ns.addScript = function(path) {
            scripts.push(path);
        }
        ns.close = function() {
            _container.style.display = 'none';
            var endTime = new Date(),
                dur = Math.abs(endTime.getTime() - _startTime.getTime());
            console.log('end: '+dur+' ms');
        }
        ns.load = function() {
            var _pendingScripts = [],
                _firstScript    = document.scripts[0];
            /*
            Schreibt alle Skripte in den 'head'
            https://www.html5rocks.com/en/tutorials/speed/script-loading/
            */
            for (var i=0; i<ns.scripts.length; i++) {
                var src = ns.scripts[i],
                    script;
                if ('async' in _firstScript) { // moderne Browser
                    script = document.createElement('script');
                    script.async = false;
                    script.src = src;
                    document.head.appendChild(script);
                } else if (_firstScript.readyState) { // IE<10
                    script = document.createElement('script');
                    _pendingScripts.push(script);
                    script.onreadystatechange = function() {
                        // Überwacht ob das Skript im IE geladen wurde
                        var pendingScript;
                        while (pendingScripts[0] && pendingScripts[0].readyState == 'loaded') {
                            pendingScript = pendingScripts.shift();
                            // avoid future loading events from this script (eg, if src changes)
                            pendingScript.onreadystatechange = null;
                            // can't just appendChild, old IE bug if element isn't closed
                            firstScript.parentNode.insertBefore(pendingScript, firstScript);
                        }
                    };
                    script.src = src;
                } else { // Fallback zu 'defer'
                    document.write('<script src="' + src + '" defer></'+'script>');
                }
            }

            /*
            Läd alle Bilder in den Speicher
            */
            for (var i=0; i<ns.images.length; i++) {
                var img = new Image();
                img.src = ns.images[i];
                _imgInMem.push(img);
            }            
        }
        ns.refreshProgressText = function() {
            if (_text === null) { return }
            if (arguments.length == 1) {
                _text.innerHTML = arguments[0];
            } else if (arguments.length == 2) {
                _text.innerHTML = Math.round(arguments[0]/arguments[1]*100)+' %';
            } 
        }
        ns.start = function(containerSelector, textSelector) {
            _startTime = new Date();
            _container = document.querySelector(containerSelector);
            _text      = document.querySelector(textSelector);
            _container.style.display = 'block';
            console.log('start');
        }

        return ns;

    })({});
    
    return ns;
    
})(rbar || {})