angular.module('maville', [])
.controller('ctrl',function($scope, getAllCookies, pushCookie, validatePassword, sortPosts, parseDate, randomColor){
	var validated=false;
	var password=getCookie('password');

	if(password!=null){
		validated = true;
	}

	$scope.cookies = [];
	$scope.writingCookie = false;
	$scope.inputValidated = true;

	function getCookie(c_name) {
		var c_value = " " + document.cookie;
		var c_start = c_value.indexOf(" " + c_name + "=");
		if (c_start == -1) {
		    c_value = null;
		}
		else {
		    c_start = c_value.indexOf("=", c_start) + 1;
		    var c_end = c_value.indexOf(";", c_start);
		    if (c_end == -1) {
		        c_end = c_value.length;
		    }
		    c_value = unescape(c_value.substring(c_start,c_end));
		}
		return c_value;
	}

	function deleteAllBrowserCookies() {
	    var cookies = document.cookie.split(";");

	    for (var i = 0; i < cookies.length; i++) {
	    	var cookie = cookies[i];
	    	var eqPos = cookie.indexOf("=");
	    	var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
	    	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
	    }
	}

	function updateCookies(result){
		$scope.cookies = sortPosts(result.result);//.reverse();
		$scope.$digest();
	}

	function getAC(callback){
		return function(){ getAllCookies(callback) };
	}

	function showInput(notDigest){
		$scope.writingCookie = true;
		!notDigest && $scope.$digest();
	}

	function validateInput(caption, text){
		return caption.length !== 0 || text.length !== 0;
	}

	$scope.notWritingCookie = function(){
		return !writingCookie;
	}

	$scope.generateNewCookie = function(){
		if($scope.writingCookie){
			if(validateInput($scope.newCookieCaption, $scope.newCookieText)){
				
				pushCookie({
					caption: $scope.newCookieCaption,
					html: $scope.newCookieText,
					password: password
				},(function(callback){
					return function(){ getAllCookies(callback) };
				})(updateCookies))

				$scope.newCookieCaption = '';
				$scope.newCookieText = '';
				$scope.writingCookie = false;
			}else{
				// something should happen if input is not validated
			}
			return;
		}

		if(!validated){
			password = prompt("Dima, is that you?", "");
			validatePassword(password, function(response){
				if(response.result === true){
					document.cookie = "password=" + password;
					showInput();
				}
			})
		}else{
			showInput(true);
		}
	}

	getAllCookies(updateCookies);
	//document.body.style.backgroundColor = randomColor(); // we dont want it right now
});