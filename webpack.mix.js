const mix = require('laravel-mix');

mix
	
	.js('src/js/app.js', 'dist/js/app.js')
	.copy('src/index.html', 'dist/index.html')
;