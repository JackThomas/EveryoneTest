//  ============================================================================================================
//  Dependencies
//  ============================================================================================================

	import gulp from "gulp";
	import gutil from "gulp-util";

	import path from "path";

	import through2 from "through2";
	import stream from "vinyl-source-stream";
	import buffer from "vinyl-buffer";

	import babelify from "babelify";
	import browserify from "browserify";

	import uglify from "gulp-uglify";
	import sourcemaps from "gulp-sourcemaps"


	//  Lean error log
	function LOG_ERROR(error) {
		if (error.codeFrame) {
			console.log("\n");
			console.log(error.codeFrame);
			console.log("\n");
			console.log(error.loc);
			console.log(error.filename);
			console.log(error.SyntaxError);
			console.log("\n");
		}
		else {
			console.log(error);
		}

		//  Important for Browserify
		this.emit("end");
	}

	//  Check environment
	const production = (gutil.env.prod);

//  ============================================================================================================
//  Tasks
//  ============================================================================================================

	// Compile Scripts
	gulp.task("browserify", ["clean:js"], function compileScripts(complete){

		let transform = browserify({
			"debug": (production) ? false : true,
			"paths": [
				"int-src/js"
			],
		}).transform(babelify, {
			"presets": [
				["env", {
					"targets": {
						"browsers" : ["last 4 versions", "ie >= 10"]
					}
				}]
			]
		});

		gulp.src([
			"src/js/*.js"
		])
		.pipe(
			through2.obj(
				function write(file, enc, next) {
					transform.add(file.path);
					next();
				},
				function end(next) {

					transform.bundle()
						.pipe(
							stream("site.js")
						)
						.pipe(
							buffer()
						)
						.pipe(
							production
							?  	gutil.noop()
							:   sourcemaps.init({ loadMaps: true })
						)
						.pipe(
							production
								?   uglify()
								:   gutil.noop()
						)
						.pipe(
							production
							?   gutil.noop()
							:   sourcemaps.mapSources(function(sourcePath) {
									console.log(sourcePath);
									return "../../../" + sourcePath;
								}))
						.pipe(
							production
							?   gutil.noop()
							:   sourcemaps.write("./")
						)
						.pipe(
							gulp.dest("dist/assets/js")
						)
						.on("finish", function() {
							complete();
						});


					next();

				}
			)
		);
	});