WorkWorkJS
=========

A library that speeds up computation-heavy tasks in JavaScript with multi-threading and Web Workers.

# Using it 

*Example*
```js
var arr = [64, 70, 80];

WorkWork.map(arr, function (elem) {
    return fibonacci(elem);
})
.then(function (resultArr) {
    console.log(resultArr);
})

// logs the 64th, the 70th, and the 80th fibonacci numbers

```

# Installing it

You can get the raw js file here: https://raw.githubusercontent.com/workworkjs/workworkjs/workwork/workwork.js

Just put it into your script tag like so:

```html
<script src="workwork.js"></script> 
```

*OR* Run 
``` 
npm install workworkjs --save 
``` 
and configure your static routing to correctly look into the node_modules folder. 

# When should I use this?

WorkWork is best suited for situations where heavy blocking computation would otherwise be necessary. It is not intended to replace the original Array.prototype ```map``` and ```filter``` but rather to supplement them when heavy computation should be performed on a separate thread. 

*Example*
```js
var arr = [1, 2, 3];

WorkWork.map(arr, function (elem) {
    return elem + 1;
})
.then(function (resultArr) {
    console.log(resultArr);
})

```
This is slower than if you just used 
```js 
Array.prototype.map 
```

# Methods

### WorkWork.map(arr, fn)

Takes in an array as the first argument, and a function as the second that returns a modified elem. 
Works just like the native Array.prototype.map except WorkWork.map returns a promise that must be resolved. 

*Example*
```js
var arr = [50000, 56456, 125694];

WorkWork.map(arr, nthPrime)
.then(function (resultArr) {
    console.log(resultArr);
});

// logs a new array with the 50,000th, the 56456th, and the 125694th prime numbers
```
******
### WorkWork.filter(arr, fn)

Takes in an array as the first argument, and a function as the second that returns a true or false. 
Works just like the native Array.prototype.filter except WorkWork.filter returns a promise that must be resolved. 

*Example* 
```js
var arr = [50000, 56456, 125694];

WorkWork.map(arr, nthPrime)
.then(function (resultArr) {
    return WorkWork.filter(resultArr, function (elem) {
        return (elem % 2 === 0);
    });
})
.then(function (resultFilter) {
    console.log(resultFilter);
})

// logs a new array with only the even prime numbers from before
```

Can also be used in isolation

*Example* 
```js
var arr = [50000, 56456, 125694];

WorkWork.filter(arr, isPrime)
.then(function (resultArr) {
    console.log(resultArr);
})

// logs an empty array since none of the elements are prime
```

# Notes
Our name: https://www.youtube.com/watch?v=2ccZBlLJQ24
******

More about Web Workers: http://ejohn.org/blog/web-workers/

More about Blobs and inline Workers: http://www.html5rocks.com/en/tutorials/workers/basics/#toc-inlineworkers

Intel's Efforts in River Trail: https://software.intel.com/en-us/articles/river-trail-bringing-parallel-javascript-to-the-web

Parallel.js https://adambom.github.io/parallel.js/
