/*
Base File
*/
(function() {
	'use strict';

	console.log('js');

	$(document).on('click', '.red-btn', function() {
		$(this).toggleClass('active');
	});
})();