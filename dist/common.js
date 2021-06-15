
/* init  */

(function(window, document, parent){
    if(typeof console=="undefined"){
        console = {
            log     : function(){},
            info    : function(){},
            warn    : function(){},
            error   : function(){}
        };
    }

}(window, document, parent));

window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
window.cancelAnimationFrame = (function(){
    return  window.cancelAnimationFrame       ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame    ||
        window.oCancelAnimationFrame      ||
        window.msCancelAnimationFrame     ||
        window.clearTimeout;
})();
window.requestFunc = [];

window.EventDispatcher = (function(){
    var listeners = [];
    var isDispatchPlaying = false;
    var removeArr = [];

    function removeStart(){
        if(removeArr.length == 0) return;
        for(var i = 0, l = removeArr.length; i < l; ++i){
            removeListener(removeArr[i].s, removeArr[i].e, removeArr[i].c);
        }
        removeArr = [];
    }

    function removeListener(scope, evt_name, callback){
        if(typeof listeners[evt_name] != "undefined"){
            for(var i = 0, l = listeners[evt_name].length; i < l; ++i){
                if(listeners[evt_name][i].s == scope){
                    delete listeners[evt_name][i].s;
                    delete listeners[evt_name][i].c;

                    listeners[evt_name].splice(i, 1);
                    if(callback) callback();
                    break;
                }
            }
        }
    }

    return {
        add:function(scope, evt_name, callback){
            if(typeof listeners[evt_name] == "undefined") listeners[evt_name] = [];
            listeners[evt_name].push({s:scope, c:callback});
        },
        is:function(evt_name, params){
            if(typeof listeners[evt_name] != "undefined"){
                isDispatchPlaying = true;
                for(var i = 0, l = listeners[evt_name].length; i < l; ++i){
                    var s = listeners[evt_name][i].s;
                    listeners[evt_name][i].c.call(s, params);

                    if(i == l-1) isDispatchPlaying = false, removeStart();
                }
            }
        },
        remove:function(scope, evt_name, callback){
            if(isDispatchPlaying) removeArr.push({s:scope, e:evt_name, c:callback});
            else removeListener(scope, evt_name, callback);
        }
    };
})();
var Events = {
    SEND:"SEND",
    STARTSLIDE:"STARTSLIDE",
    STOPSLIDE:"STOPSLIDE",
    STARTFLOWTEXT:"STARTFLOWTEXT",
    STOPFLOWTEXT:"STOPFLOWTEXT",
    STARTCIRCLEMOTION:"STARTCIRCLEMOTION",
    STOPCIRCLEMOTION:"STOPCIRCLEMOTION",
    HIGHLIGHT_GRAPH1:"HIGHLIGHT_GRAPH1",
    HIGHLIGHT_GRAPH2:"HIGHLIGHT_GRAPH2",
    HIGHLIGHT_GRAPH3:"HIGHLIGHT_GRAPH3"

}

