angular.module('maville')
.directive('cookie', function(parseDate){
	var template = 	'<div class=""><hr>' +
						'<div class="">{{cookie.caption}}</div>' +
						'<h6 class="html"></h6>' +
						'<div class=""><span class="date">{{cookie.date.date}}</span> <span class="time">{{cookie.date.time}}</span></div>'
					'</div>'
	return {
		template: template,
		scope:{
			cookie:'=oneCookie'
		},
		link: function(scope, element){
			scope.cookie.date = parseDate(scope.cookie.createdAt);
			$(element).find('.html').append(scope.cookie.html);
		}
	}
})