//  ============================================================================================================
//  Dependencies
//  ============================================================================================================

	import gulp from "gulp";
	import gutil from "gulp-util";

	import sass from "gulp-sass";
	import glob from "gulp-sass-glob";
	import sourcemaps from "gulp-sourcemaps";
	import importer from "sass-module-importer"

	import csso from "gulp-csso";

	import postcss from "gulp-postcss";
	import autoprefixer from "autoprefixer";
	import svgfragments from "postcss-svg-fragments";
	import mqpacker from "css-mqpacker"

	import newer from "gulp-newer";

	//  Check environment
	let production = (gutil.env.prod);
	let maps = (gutil.env.maps);

	// Set Processors
	let processors = [
        autoprefixer({ "browsers": ["last 4 versions", "ie >= 9", "ios >= 7"] }),
		svgfragments({ "encoding": "base64" }),
		mqpacker({ "sort": true })
	];

	 //  Custom error logging
    function LOG_ERROR(error) {
        if (error.message) {
            console.log("\n");
            console.log(error.message);
            console.log("\n");
        }
        else {
            console.log(error);
        }

        this.emit("end");
    }

//  ============================================================================================================
//  Tasks
//  ============================================================================================================

	// Compile Sass
	gulp.task("sass", ["clean:css", "symbols:inline"], function compileSass(){
		return gulp.src(
			[
				"src/scss/site.scss"
			],
			{
				base: "src/scss"
			}
		)
		.pipe(
			production
				?	gutil.noop()
				:	newer("sass")
		)
		.pipe(
			production
				?	gutil.noop()
				:	sourcemaps.init({ "loadMaps": false })
		)
		.pipe(glob())
		.pipe(sass({
			"sourceMaps" : "none",
			"precision" : 5,
			"importer": importer(),
			"includePaths": [
								"node_modules/bootstrap/scss",
								"node_modules/font-awesome/scss",
								"node_modules/@fortawesome/fontawesome-free/scss",
							]
		})
		.on("error", function(error){
			LOG_ERROR(error);
			this.emit("end");
		}))
		.pipe(postcss(processors)).on("error", LOG_ERROR)
        .pipe(
			production
			?	csso({
					restructure: true,
					comments: false,
					sourceMap: false,
					debug: false
			})
			:	gutil.noop()
		)
		.pipe(
			production
				? 	gutil.noop()
				:	sourcemaps.write("./", { "includeContent": true })
		)
		.pipe(gulp.dest("dist/assets/css"));
	});