module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: [
      'deploy'
    ],
    connect: {
      server: {
        options: {
          port: 8080,
          base: './deploy'
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ['src/index.html'], dest: 'deploy/index.html'},
          {cwd: 'src/css', src: '**/*', dest: 'deploy/css', expand: true},
          {cwd: 'src/assets', src: '**/*', dest: 'deploy/assets', expand: true},
          {cwd: 'src/js', src: '**/*', dest: 'deploy/js', expand: true},
          {cwd: 'node_modules/dosomething-neue/dist/assets', src: '**/*', dest: 'deploy/vendor/assets', expand: true},
          {src: ['node_modules/dosomething-neue/dist/modernizr.js'], dest: 'deploy/vendor/modernizr.js'},
          {src: ['node_modules/dosomething-neue/dist/neue.js'], dest: 'deploy/vendor/neue.js'},
          {src: ['node_modules/dosomething-neue/dist/neue.css'], dest: 'deploy/vendor/neue.css'}
        ]
      }
    },
    watch: {
      files: 'src/**/*.js',
      tasks: ['copy']
    },
    open: {
      dev: {
        path: 'http://localhost:8080/index.html'
      }
    }
  });

  grunt.registerTask('default', ['clean', 'copy', 'connect', 'open', 'watch']);

}
