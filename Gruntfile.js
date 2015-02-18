/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: port,
					base: '.',
                    livereload: true,
                    open: true
				}
			}
		},

		zip: {
			'reveal-js-presentation.zip': [
				'index.html',
				'bower_components/reveal.js/css/**',
				'bower_components/reveal.js/js/**',
				'bower_components/reveal.js/lib/**',
				'bower_components/reveal.js/images/**',
				'bower_components/reveal.js/plugin/**'
			]
		},

		watch: {
            options: {
                livereload: true
            },
            html: {
                files: [ 'index.html']
            }
		},

	    rsync: {
	      options: {
	        args: ['--verbose','--delete'],
	        exclude: ['.git*','*.scss','node_modules','test'],
	        recursive: true,
	      },
	      dist: {
	        options: {
	          src: './',
	          dest: '/cygdrive/w/home/harshbarger/git-intro'
	        }
	      }
	    }

	});

	require('load-grunt-tasks')(grunt);

	// Default task
	grunt.registerTask( 'default', [ 'serve' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

};
