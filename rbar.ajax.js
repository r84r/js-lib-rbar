/*
    rbar.ajax.js  //  ralf-bartsch.net  //  2018-09-13

    license and info: https://github.com/r84r/js-lib-rbar


    Asynchrone Kommunikation Browser-Server
*/

var rbar = (function(ns) {

    ns.ajax = (function(ns) {

        function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }
        
        /*
        Daten einer Seite bzw. eines Request anfordern
        */
        ns.get = function(url, success, fail) {
            var request = new XMLHttpRequest();
            request.addEventListener('load', function() {
                if (request.status >= 200 && request.status < 400) {
                    if (isFunction(success))
                        success(request.responseText)
                    else
                        console.error('Function is not defined.');
                } else {
                    console.warn(request.statusText, request.responseText);
                    if (isFunction(fail))
                        fail(request.statusText);
                    else
                        console.error('Function is not defined.');
                }
            });
            request.addEventListener('error', function() {
                console.warn(request.statusText, request.responseText);
                if (isFunction(fail))
                    fail(request.statusText);
                else
                    console.error('Function is not defined.');
            });
            request.open('GET', url);
            request.send();
        }

        /*
        Formulardaten senden und Antwort erhalten
        */
        ns.post = function(url, data) {
            var request = new XMLHttpRequest();
            request.open('POST', url, true);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.onload = function() {
                if (request.status === 200) 
                    return request.responseText;
                else
                    return false;
            };
            request.send(encodeURI(data));
        }

        /*
        JSON-Objekt senden und verarbeitet zurück erhalten
        */
        ns.updateJSON = function(url, data) {
            var request = new XMLHttpRequest();
            request.open('PUT', url);
            request.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                if (request.status === 200) 
                    return JSON.parse(request.responseText);
                else
                    return false;
            };
            request.send(JSON.stringify(data)); 
        }
        
        return ns;

    })({});
    
    return ns;
    
})(rbar || {})