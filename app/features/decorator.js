'use strict';

/* Decorator para servicio $log (hora - log mensaje)*/

angular.module('toollife')
.config(function ($provide){
	$provide.decorator('$log', function ($delegate){
		var debugFn = $delegate.debug;

		$delegate.debug = function() {
			var now = (new Date()).toLocaleTimeString();
			arguments[0] = now + ' - ' + arguments[0];
			debugFn.apply(null, arguments);
		};

		return $delegate;
	})
});