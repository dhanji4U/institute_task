
asyncLoop = require('asyncLoop')

var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function end(err) {

    if(err) throw err;
    
    console.log("ended");
}


asyncLoop(array, end, function(elem, next, idx) {
    
    var tmt = Math.round(500 * Math.random() * 100)/100;


    setTimeout(function() {
        console.log("callback for", elem, "after ", tmt, "ms");
       next();
    });

});





