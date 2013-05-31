// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  'use strict';

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js',
				'!<%= yeoman.app %>/scripts/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/main.min.js': ['<%= yeoman.app %>/scripts/{,*/}*.js']
        }
      }
    },
    less: {
      dist: {
        options: {
          paths: ['<%= yeoman.app %>/styles'],
          yuicompress: true
        },
        files: {
          '<%= yeoman.dist %>/styles/main.min.css': ['<%= yeoman.app %>/styles/*.less']
        }
      }
    },
		htmlmin: {
			dist: {
				options: {
					removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					// collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'data/*',
						'font/*',
            'images/*',
            '.htaccess',
            '*.{ico,txt}'
					]
				}]
			}
		}
	});

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('build', [
    'clean',
    'uglify',
    'less',
    'copy',
    'htmlmin'
  ]);

	grunt.registerTask('default', [
    'clean',
		'jshint',
		'build'
	]);
};
