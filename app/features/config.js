'use strict';

angular.module('toollife')

.factory('config', function () {

	var urlServe = 'http://localhost:8080';
	//var debugMode = true;
	var img = {
		avatar : 'content/img/ionic.png',
		picBackground : ''
	};

	var status = 'Hey, theres! Im using Toollife!'

	var provider = 'local';

	return {
		API: urlServe,		
		IMG : img,
		PROVIDER: provider
	}
});