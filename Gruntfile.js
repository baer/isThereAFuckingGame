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
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/main.min.js': [
            './node_modules/handlebars/dist/handlebars.js',
            './node_modules/moment/moment.js',
            './node_modules/moment-timezone/moment-timezone.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    minjson: {
      compile: {
        files: {
          '<%= yeoman.dist %>/data/schedule.min.json': ['<%= yeoman.app %>/data/*.json']
        }
      }
    },
    less: {
      dist: {
        options: {
          paths: ['<%= yeoman.app %>/styles'],
          yuicompress: true,
          compress: true
        },
        files: {
          '<%= yeoman.dist %>/styles/main.min.css': ['<%= yeoman.app %>/styles/*.less']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          useShortDoctype: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeComments: true,
          removeCDATASectionsFromCDATA: true,
          removeCommentsFromCDATA: true,
          removeRedundantAttributes: true,
          removeAttributeQuotes: true,
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
  grunt.loadNpmTasks('grunt-minjson');

  grunt.registerTask('build', [
    'clean',
    'uglify',
    'less',
    'minjson',
    'copy',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'build'
  ]);
};
