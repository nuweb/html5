module.exports = function(grunt) {

	//	Configurable paths
	var cnidConfig = {
		app: 'src',
		dist: 'dist'
	};

	//	Initialize the grunt tasks
	grunt.initConfig({
		cnid : cnidConfig,
		/**
		* Generate a deployable directory.
		**/
		copy: {
			build: {
				files: [
					{
						expand: true,
						src: ['*.html', '*.js', 'css/**', 'assets/**', 'app/**', 'libs/**', 'components/requirejs/require.js'],
						dest: '<%= cnid.dist%>/',
						cwd: '<%= cnid.app%>'
					}
				]
			}
		},
		jasmine : {
			src : 'src/app/app.js',
			options: {
				specs : 'test/unit/appSpec.js',
				vendor: [
					'src/components/angular/angular.js',
					'src/components/angular-resource/angular-resource.js',
					'src/components/angular-mocks/angular-mocks.js'
				]
			}
		},
		requirejs: {
			compile: {
				options: {
					name: 'main',
					baseUrl: "src/app",
					mainConfigFile: "src/app/main.js",
					out: "dist/app/main.js"
				}
			}
		},
		less: {
			styles: {
				options: {
					yuicompress: true
				},
				files: {
					'src/css/main.css': 'src/less/main.less'
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			files: [
				'src/app/**/*.html',
				'src/*.html'
			],
			styles: {
				files: 'src/less/*.less',
				tasks: ['less']
			}
		},
		/**
			* All javascript sources are linted based on the policies listed in 'options'.
		*/
		jshint: {
			src: [
				'<%= cnid.app %>/app/*.js', '<%= cnid.app %>/app/**/*.js'
			],
			gruntfile: [
				'Gruntfile.js'
			],
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				eqnull: true
			},
			globals: {}
		},
		uglify: {
			dist: {
				files: {
					'<%= cnid.dist %>/components/requirejs/require.js': [
					'<%= cnid.app %>/components/requirejs/require.js'
					]
				}
			}
		},
		/**
		* The directories to delete.
		**/
		clean: [
			'<%= cnid.dist %>',
			'<%= cnid.app %>/css'
		]
	});

	//	Load the plugins that provide the tasks we specified in package.json
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//	Setup the default task
	grunt.registerTask('default', ['less', 'watch']);
	grunt.registerTask('build', ['jshint', 'less', 'copy', 'uglify', 'requirejs']);

};

