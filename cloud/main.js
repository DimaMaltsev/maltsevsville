
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

function queryFind(query, response){
	query.find({
		success: function(results){
			response.success(results);
		}
	});
}

Parse.Cloud.beforeSave("cookie", function(request, response) {
	var query = new Parse.Query('password');
	query.find({
		success: function(results){
			if (results[0].get('password')===request.object.get('password')){
				response.success();
			}
			else{
				response.error("Save attemt with WRONG password.");
			}
		}
	});
});

Parse.Cloud.define("getAllCookies", function(request, response) {
	var query = new Parse.Query('cookie');
	queryFind(query, response);
});

Parse.Cloud.define("validatePassword", function(request, response) {
	var query = new Parse.Query('password');
	query.find({
		success: function(results){
			if (results[0].get('password')===request.params.password){
				response.success(true);
			}
			else{
				response.success(false);
			}
		}
	});
});

Parse.Cloud.define("getCookie", function(request, response) { // cookie id needed
});

Parse.Cloud.define("getCookiesFromPage", function(request, response) { // page number needed
});

Parse.Cloud.define("getLastCookies", function(request, response) {
});