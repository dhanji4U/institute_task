AsyncLoop: simple async loop function
=====================================

AsyncLoop exports a single function with the following signature: (array, end, forEach):

* array is the array to loop over
* end is a callback invoked when all the elements have been looped over. The first argument is an error, or undefined.
* forEach receives three arguments: (elem, next, index). It is invoked for each element of array. next is a function that, when invoked, passes control to the next element in th array. Unless it's invoked with an argument, which is assumed to be an error. In this case, the async loop ends immediately.





