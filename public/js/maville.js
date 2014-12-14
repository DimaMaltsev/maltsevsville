angular.module('maville', [])
.controller('ctrl',function($scope, getAllCookies, pushCookie, validatePassword){
	var validated=false;

	$scope.cookies = [];
	$scope.writingCookie = false;
	$scope.inputValidated = true;

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
		$scope.cookies = result.result.reverse();
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

	getAllCookies(updateCookies);

	$scope.notWritingCookie = function(){
		return !writingCookie;
	}

	$scope.generateNewCookie = function(){
		if($scope.writingCookie){
			if(validateInput($scope.newCookieCaption, $scope.newCookieText)){
				
				pushCookie({
					caption: $scope.newCookieCaption,
					html: $scope.newCookieText
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
			var password = prompt("Dima, is that you?", "");
			validatePassword(password, function(response){
				if(response.result === true){
					showInput();
				}
			})
		}else{
			showInput(true);
		}
	}
})