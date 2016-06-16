self.addEventListener('message', function(e) {
  var num = e.data;
  function fibonacciNoCache(num) {
    if (num <= 1) return num;
    return fibonacciNoCache(num - 1) + fibonacciNoCache(num - 2);
  }

  var result = fibonacciNoCache(num);
  console.log(result);
  self.postMessage(result);
  self.close();
}, false);