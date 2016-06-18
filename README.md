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

- OR - 

Run 
``` npm install workworkjs --save ``` 
and configure your static routing 

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



Our name: https://www.youtube.com/watch?v=bLbhYYmXDhc
