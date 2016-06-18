WorkWorkJS
=========

A library that speeds up computation-heavy tasks in JavaScript with multi-threading and Web Workers.

# Using it 

```
var arr = [64, 70, 80];

WorkWork.map(arr, function (elem) {
    return fibonacci(elem);
})
.then(function (resultArr) {
    console.log(resultArr);
})

```

# Installing it

You can get the raw js file here: 
Or if you like it squashed (minified): 

Just put it into your script tag like so:

``` <script src="workwork.js"></script> ```

OR 

Run 
``` npm install workworkjs --save ``` 
and configure your static routing to correctly look into the node_modules folder. 

# Applications

WorkWork is best suited for situations where heavy blocking computation would otherwise be necessary. It is not intended to replace the original Array.prototype ```map``` and ```filter``` but rather to supplement them when heavy computation should be performed on a separate thread. 

This is slower than if you just used ``` Array.prototype.map ```
``` 
var arr = [1, 2, 3];

WorkWork.map(arr, function (elem) {
    return elem + 1;
})
.then(function (resultArr) {
    console.log(resultArr);
})

```

# Methods

### WorkWork.map(arr, fn)

Takes in an array as the first argument, and a function as the second that returns a modified elem. 
Works just like the native Array.prototype.map except WorkWork.map returns a promise that must be resolved. 

### WorkWork.filter(arr, fn)

Takes in an array as the first argument, and a function as the second that returns a true or false. 
Works just like the native Array.prototype.filter except WorkWork.filter returns a promise that must be resolved. 


# Notes
Our name: https://www.youtube.com/watch?v=bLbhYYmXDhc
