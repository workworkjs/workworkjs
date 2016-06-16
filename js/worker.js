function isPrime (num) {
	var current = 2;
	while (current < num) {
		if (num < 2) {
			return false;
		}
		if (current > Math.sqrt(num)) {
			return true;
		}
		if (num % current === 0) {
			return false;
		}
		current += 1;
	}
	return true;
}

function nthPrime (n) {
	var primes = [2,3,5];
	var current = 5;

	while (primes.length < n) {
		current += 2;
		if (isPrime(current)) primes.push(current);

		if (primes.length === n) break;
		current += 4;
		if (isPrime(current)) primes.push(current);
	}

	return primes[n - 1];
}


self.addEventListener('message', function(e) {
	var num = e.data;
	var result = nthPrime(num);
	console.log(result);
	self.postMessage(result);
	self.close();
}, false);