angular.module('maville')
.directive('cookie', function(){
	var template = 	'<div class=""><hr>' +
						'<div class="">{{cookie.caption}}</div>' +
						'<h6 class="html"></h6>' +
						'<div class=""><span class="date">{{cookie.time.date}}</span> <span class="time">{{cookie.time.time}}</span></div>'
					'</div>'
	return {
		template: template,
		scope:{
			cookie:'=oneCookie'
		},
		link: function(scope, element){
			scope.cookie.time = {}
			scope.cookie.time.date = scope.cookie.createdAt.split('T')[0];
			scope.cookie.time.time = scope.cookie.createdAt.split('T')[1].replace('Z', '').split('.')[0];
			$(element).find('.html').append(scope.cookie.html);
		}
	}
})