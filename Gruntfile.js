module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ng-constant');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-war');
	grunt.loadNpmTasks('grunt-bump');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			debug: [
				'dist',
				'assets'
			]
		},
		bump:{
			options:{
				files:['package.json'],
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'upstream'
			}
		},
		copy:{
			assets:{
				files: [
					{
						expand: true,
						cwd: 'src/',
						src: '**/*',
						dest: 'assets/',
						flatten: false
					}
				]
			},
			main:{
				files:[
					{
						/*src: ['bower_components/**'],
						dest: 'dist/'*/
						expand:true,
						cwd:'bower_components',
						src: '**/*.*',
						dest: 'dist_<%= pkg.version %>/bower_components',
						flatten: false
					},
					{
						/*src: ['bower_components/**'],
						dest: 'dist/'*/
						expand:true,
						cwd:'node_modules',
						src: ['angular-ui-bootstrap/*.*', 'angucomplete-alt/dist/*.*', 'angucomplete-alt/*.css'],
						dest: 'dist_<%= pkg.version %>/node_modules',
						flatten: false
					},
					{
						expand: true,
						cwd:'assets',
						src:'**/*.*',
						dest: 'dist_<%= pkg.version %>/assets',
						flatten: false
					},
					{
						expand: true,
						cwd:'modules',
						src:'**/*.html',
						dest: 'dist_<%= pkg.version %>/modules',
						flatten: false
					},
					{
						expand: true,
						cwd:'modules/webService/mock_data',
						src:'*.json',
						dest: 'dist_<%= pkg.version %>/modules/webService/mock_data',
						flatten: false
					},
					{
						src: 'index-Release.html',
						dest: 'dist_<%= pkg.version %>/index.html'
					}
				]
			},
			dist:{
				files:[
					{
						/*src: ['bower_components/**'],
						dest: 'dist/'*/
						expand:true,
						cwd:'bower_components',
						src: '**/*.*',
						dest: 'dist/bower_components',
						flatten: false
					},
					{
						/*src: ['bower_components/**'],
						dest: 'dist/'*/
						expand:true,
						cwd:'node_modules',
						src: ['angular-ui-bootstrap/*.*', 'angucomplete-alt/dist/*.*', 'angucomplete-alt/*.css'],
						dest: 'dist/node_modules',
						flatten: false
					},
					{
						expand: true,
						cwd:'assets',
						src:'**/*.*',
						dest: 'dist/assets',
						flatten: false
					},
					{
						expand: true,
						cwd:'modules',
						src:'**/*.html',
						dest: 'dist/modules',
						flatten: false
					},
					{
						expand: true,
						cwd:'modules/webService/mock_data',
						src:'*.json',
						dest: 'dist/modules/webService/mock_data',
						flatten: false
					},
					{
						src: 'index-Release.html',
						dest: 'dist/index.html'
					}
				]
			}
		},
		html2js:{
			dist:{
				src: ['modules/**/*.html'],
				dest: 'tmp/templates.js'
			}	
		},
		concat:{
			sass:{
				src:['assets/css/sass/app.sass', 'modules/**/*.sass'],
				dest:'assets/css/sass/main.sass'
			},
			css:{
				src:['assets/css/compiled.css'],
				dest: 'assets/css/style.css'
			},
			js:{
				options: {
					separator: ';'
				},
				src:[
					'bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',
					'bower_components/angular/angular.min.js',
					'node_modules/angular-ui-router/release/angular-ui-router.min.js',
					'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
					'app.js',
					'modules/*/*.js'
				],
				dest:'assets/js/scripts.js'
			}
		},
		uglify: {
			dev: {
    				files: {
      					'dist_<%= pkg.version %>/app.min.js': [ 'dist_<%= pkg.version %>/app.js' ]
    				},
    				options: {
      					mangle: {
      						except: ['d3']
      					}
    				}
  			},
 			dist: {
    				files: {
      					'dist/app.min.js': [ 'dist/app.js' ]
    				},
    				options: {
      					mangle: {
      						except: ['d3']
      					}
    				}
  			}
		},
		karma:{
            unit:{
                    configFile: 'karma.conf.js'
            },
            build:{
            		configFile: 'jenkins.conf.js'
            }
	    },
	    jshint:{
	            options:{
	                    curly: true,
	                    eqeqeq: true,
	                    eqnull: true,
	                    browser: true,
	                    globals:{
	                            jQuery:true
	                    },
	            },
	            all:['*.js', 'modules/**/*.js']
	    },
	    connect:{
	    	server:{
	    		options:{
	    			port:9019,
	    			livereload: true
	    		}
	    	}
	    },
	    sass:{
	    	dist:{
	    		files:{
	    			'assets/css/compiled.css':'assets/css/sass/main.sass'
	    		}
	    	}
	    },
	    watch:{
	    	js:{
	    		files:['modules/**/*.*', 'app.js', 'index.html'],
	    		options:{
	    			livereload: true
	    		}
	    	},
	    	sass:{
	    		files: ['assets/css/sass/*.sass', 'modules/**/*.sass'],
	    		tasks:['concat:sass', 'sass']
	    	},
	    	css:{
	    		files:['assets/css/*.css'],
	    		options:{
	    			livereload: true
	    		}
	    	}
	    }
	});
	
	grunt.registerTask('debug', [
		'clean:debug',
		'connect:server',
		'copy:assets',
		'concat:sass',
		'sass',
		'concat:css',
		'concat:js',
		'watch'
	]);
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('jenkins', ['karma:build']);
}