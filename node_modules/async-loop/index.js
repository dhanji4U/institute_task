
module.exports = asyncLoop = function(array, end, forEach) {
    var idx, next;

    idx = 0;
    
    next = function(err) {
        var elem;
        
        if (err) { 
            //end the loop immediately on error
            return end(err);
        }
      
        if (idx < array.length) {
            elem = array[idx];
            idx += 1;
            
            //process elem
            forEach(elem, next, idx - 1);
      } 
      else {
        end();
      }
    };

    next();
};


