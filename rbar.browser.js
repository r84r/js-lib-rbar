/*
    rbar.browser.js  //  ralf-bartsch.net  //  2018-07-09

    license and info: https://github.com/r84r/js-lib-rbar
    

    Ermitteln der Browser und Leistung
*/

var rbar = (function(ns) {

    ns.browser = (function(ns) {

        /*
        Browser ermitteln
        -> https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
        Hinweise
        - background-attachment:fixed mit overflow:hidden funktioniert in Edge nicht
        */
        ns.isIE     = /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11
        ns.isEdge   = !ns.isIE && !!window.StyleMedia;              // Edge 20+
        ns.isOpera  = (!!window.opr && !!opr.addons) ||             // Opera 8.0+
                      !!window.opera || 
                      navigator.userAgent.indexOf(' OPR/') >= 0;
        ns.isChrome = !!window.chrome && !!window.chrome.webstore;  // Chrome 1+
        ns.isBlink  = (ns.isChrome || ns.isOpera) && !!window.CSS;        // Blink engine
        ns.isSafari = /constructor/i.test(window.HTMLElement) ||    // Safari 3.0+ "[object HTMLElementConstructor]" 
                      (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })
                      (!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
        
        /*
        Browserleistung anhand der Loops innerhalb einer bestimmten Zeit ermitteln
        -> ist vom System und der JS-Engine abhängig
        -> auf dem Desktop sind z.B. Opera und Chrome doppelt bzw. dreimal so schnell wie FF bzw. Edge
        */
        ns.testLoopsPerTime = function(milliseconds) {
            var startTime = new Date().getTime(),
                currentTime,
                timeDiff,
                counter = 0;
            do {
                counter++;
                currentTime = new Date().getTime();
                timeDiff    = currentTime - startTime;
            } while (timeDiff < milliseconds);
            return counter;
        }

        return ns;

    })({});
    
    return ns;
    
})(rbar || {})