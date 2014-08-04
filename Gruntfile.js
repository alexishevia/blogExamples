var _ = require('underscore');

var doNothing = function(){};

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-newer');

  grunt.initConfig({

    clean: {
      dev: ['.tmp/**']
    },

    copy: {
      dev: {
        files: [
          { src: 'node_modules/requirejs/require.js', dest: '.tmp/require.js' },
          { src: 'routes.js', dest: '.tmp/routes.js' },
          { expand: true, cwd: 'ui', src: '**/*', dest: '.tmp' },
          { expand: true, src: 'controllers/**/*.js', dest: '.tmp' },
          { expand: true, src: 'collections/**/*.js', dest: '.tmp' },
          { expand: true, src: 'models/**/*.js', dest: '.tmp' },
          { expand: true, src: 'mixins/**/*.js', dest: '.tmp' }
        ]
      }
    },

    react: {
      dev: {
        files: [
          {
            expand: true,
            cwd: '.',
            src: 'views/**/*.js',
            dest: '.tmp',
            ext: '.js'
          }
        ]
      }
    },

    watch: {
      jsx: {
        files: ['views/**/*.js'],
        tasks: ['newer:react:dev']
      },
      js: {
        files: ['controllers/**/*.js', 'collections/**/*.js', 'models/**/*.js',
          'ui/**/*', 'mixins/**/*.js'],
        tasks: ['newer:copy:dev']
      }

    }

  });

  /* -- 'start' task -- */
  grunt.registerTask('start', 'Run application', function() {
    var options, cmd, serverArgs, server, inspector, done;

    options = {
      keepAlive: false,
      respawn: false,
      nodeEnv: 'development',
      port: 3000
    };

    _.each(arguments, function(arg){
      var asInt = parseInt(arg, 10);
      if(_.isFinite(asInt)){ options.port = asInt; }
      else if(arg === 'keepAlive'){ options.keepAlive = true; }
      else if(arg === 'respawn'){ options.respawn = true; }
      else if(_.contains(['production', 'staging', 'test'], arg)){
        options.nodeEnv = arg;
      }
    });

    done = this.async();
    serverArgs = ['backend/app.js', 'start'];

    if(options.respawn){
      // launch app server with supervisor
      cmd = 'supervisor';
      serverArgs.unshift('--watch', '.tmp', '--watch', 'backend', '--');
    }
    else{
      // launch app with node
      cmd = 'node';
    }

    // launch app server
    console.log(cmd, JSON.stringify(serverArgs));
    server = grunt.util.spawn({
      cmd: cmd,
      args: serverArgs,
      env: _.extend(process.env,
                    { NODE_ENV: options.nodeEnv, PORT: options.port })
    }, doNothing);

    server.stdout.on('data', function(msg){
      if(msg.toString().indexOf('listening') >= 0 && !options.keepAlive){
        done();
      }
    });
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);

    process.on('exit', function(){
      if(inspector){ inspector.kill(); }
      if(server){ server.kill(); }
    });
  });

  grunt.registerTask('dev', [
    'clean:dev',
    'copy:dev',
    'react',
    'start:development:3000:keepAlive:respawn'
  ]);

};
