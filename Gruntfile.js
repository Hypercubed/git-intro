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
				'css/**',
				'js/**',
				'lib/**',
				'images/**',
				'plugin/**'
			]
		},

		watch: {
            options: {
                livereload: true
            },
			main: {
				files: [ 'Gruntfile.js' ],
				tasks: 'default'
			},
            html: {
                files: [ 'index.html']
            }
		},

	    rsync: {
	      options: {
	        args: ['--verbose','--delete'],
	        exclude: ['.git*','*.scss','node_modules','test','plugin','lib'],
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
