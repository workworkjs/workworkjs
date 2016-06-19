(function (window) {
	Array.prototype.clean = function () {
		return this.filter(function (elem) {
			return elem !== undefined;
		});
	};

	function WorkWork () {
		var messages = ['Whaaat?', 'Me busy. Leave me alone!!', 'No time for play.', 'Me not that kind of orc!'];
		this.value = messages[Math.floor(Math.random() * messages.length)];
	}

	function setupWorker() {
		var blob = new Blob([
		    `self.addEventListener('message', function(e) {
	    		var obj = JSON.parse(e.data);
	    		var parts = obj.fn.match(/function\\s*\\w*\\s*\\(([\\w\\s,]*)\\)\\s*\{([\\s\\S]*)\}/);
	    		var parameters = parts[1].split(/,\\s*/);
	  			obj.fn = new Function(...parameters.concat(parts[2]));
	    		var result = obj.fn(obj.elem);
	    		self.postMessage(JSON.stringify({result: result, index: obj.index, elem: obj.elem})); 
	    		self.close(); 
	    	}, false); `]);

		// Obtain a blob URL reference to our worker 'file'.
		var blobURL = window.URL.createObjectURL(blob);
		var worker = new Worker(blobURL);
		return worker;
	}

	WorkWork.forEach = function(arr, fn) {
		var numRun = 0;
		start = new Date();
		arr.forEach((num, i) => {
			var worker = setupWorker();
			var obj = JSON.stringify({num: num, fn: fn.toString()});
			worker.postMessage(obj);
			worker.addEventListener('message', function() {
				numRun++;
				if (numRun == arr.length) {
					console.log("Total Time w/ workers:", new Date() - start);

				}
			}, false);
		});
	};

	WorkWork.map = function(arr, fn) {
		return new Promise(function(resolve, reject) {
			try {
				var numRun = 0;
				var start = new Date();
				var newArr = [];

				for (var i = 0; i < arr.length; i++) {
					var elem = arr[i];
					var worker = setupWorker();
					var obj = JSON.stringify({elem: elem, index: i, fn: fn.toString()});
					worker.postMessage(obj);
					worker.addEventListener('message', function(e) {
						numRun++;
						var obj = JSON.parse(e.data);
						console.log("result:", obj);
						newArr[obj.index] = obj.result;
						// document.getElementById('2_' + obj.index).innerHTML = obj.result;
						if (numRun == arr.length) {
							console.log("Total Time w/ workers:", new Date() - start);
							resolve(newArr);
							
						}
					}, false);
				};
				
			} catch(err) {
				reject(err);
			}
		});
	};

	WorkWork.filter = function (arr, fn) {
		return new Promise(function (resolve, reject) {
			try {
				var numRun = 0;
				var start = new Date();
				var newArr = [];

				for (var i = 0; i < arr.length; i++) {
					var elem = arr[i];
					var worker = setupWorker();
					var obj = JSON.stringify({elem: elem, index: i, fn: fn.toString()});
					worker.postMessage(obj);
					worker.addEventListener('message', function (e) {
						numRun += 1;
						var obj = JSON.parse(e.data);
						if (obj.result) {
							newArr[obj.index] = obj.elem;
						}
						if (numRun === arr.length) {
							console.log('Total Time w/ workers:', new Date() - start);
							resolve(newArr.clean());
						}
					})
				}
			}
			catch (err) {
				reject(err);
			}
		});
	};
	window.WorkWork = WorkWork;
})(window);