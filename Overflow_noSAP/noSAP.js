Gvar run = Class.extend({
	data: [{
		"userId": 1,
		"id": 1,
		"title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit ",
		"body": "quia et suscipit \n suscipit recusandae consequuntur expedita et cum \n reprehenderit molestiae ut ut quas totam \n nostrum rerum est autem sunt rem eveniet architecto"
	}, {
		"userId": 1,
		"id": 2,
		"title": "qui est esse",
		"body": "est rerum tempore vitae \n sequi sint nihil reprehenderit dolor beatae ea dolores neque \n fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis \n qui aperiam non debitis possimus qui neque nisi nulla "
	}],

	init: function() {
		//var that = this;
		//	console.log(this);

		/*	this.data.forEach(function(element, index) {
				$("#buttons").append("<button id='users" + index + "' onClick='window.run.prototype.getUser()'>User ID: " + element.userId +
					"</buttons>");

			//	console.log(index, element.userId);
			});*/
	},

	overflow: function() {

		var arr = [];
		var obj = {
			'index': document.getElementById("index").value
		};
		for (var i = arr.length - 1; i >= 0; i--) {
			if (arr[i]['index'] === obj['index']) {
				arr.splice(i, 1);
			}
		}
		localStorage.removeItem("user", JSON.stringify(arr));
		console.log(arr);

	}

});