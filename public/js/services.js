angular.module('maville')
.factory('getAllCookies', function(ajax){
	var url = 'functions/getAllCookies';

	return function(success){
		ajax(url,{},success);
	}
})

.factory('pushCookie', function(ajax){
	var url = 'classes/cookie';

	return function(cookie, success){
		ajax(url, JSON.stringify(cookie), success);
	}
})

.factory('validatePassword', function(ajax){
	var url = 'functions/validatePassword';

	return function(password, success){
		ajax(url, JSON.stringify({password:password}), success);
	}
})

.factory('ajax', function(){
	var beforeSend = function (request){
        request.setRequestHeader('X-Parse-Application-Id', '9uEnNEj8nJoBYKrYt6qsgRzr7OSpMz0Cuo6REr3A');
        request.setRequestHeader('X-Parse-REST-API-Key', 'saMtMPZ4ylkfxNGL1jD0gQr9trGXJPlR05zFsQgG');
        request.setRequestHeader('Content-Type', 'application/json');
    };
    var api = 'https://api.parse.com/1/';
    var ajaxObject = {
    	type: 'POST',
    	beforeSend: beforeSend
    };
	return function(url, data, success){
		ajaxObject.url = api + url;
		ajaxObject.data = data;
		ajaxObject.success = success;
		$.ajax(ajaxObject);
	};
})

.factory('sortPosts', function(parseDate){ // TODO: change bubble sort on something else
	return function(posts){
		for(var i = 0; i < posts.length; i++){
			posts[i].dateNumber = parseDate(posts[i].createdAt).dateNumber;
		}
		for(var i = 0; i < posts.length; i++){
			for(var j = 0; j < posts.length; j++){
				if(posts[i].dateNumber>posts[j].dateNumber){
					var tmp = posts[i];
					posts[i] = posts[j];
					posts[j] = tmp;
				}
			}
		}
		return posts;
	}
})
.factory('parseDate', function(){
	return function(dateString){
		return {
			date: dateString.split('T')[0],
			time: dateString.split('T')[1].replace('Z', '').split('.')[0],
			dateString: dateString.split('Z')[0],
			dateNumber: Math.floor(new Date(dateString.split('Z')[0])/1000)
		}
	}
});