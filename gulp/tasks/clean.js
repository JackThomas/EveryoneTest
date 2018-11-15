//  ============================================================================================================
//  Dependencies
//  ============================================================================================================

	import gulp from "gulp";
	import del from "del";


//  ============================================================================================================
//  Tasks
//  ============================================================================================================

	gulp.task("clean:html", function cleanHTML() {
		return del([
			"dist/**/*.html"
		]);
	});

	gulp.task("clean:css", function cleanCSS() {
		return del([
			"dist/assets/css/**.css",
			"dist/assets/css/**.css.map"
		]);
	});

	gulp.task("clean:js", function cleanJS() {
		return del([
			"dist/assets/js/**.js",
			"dist/assets/js/**.js.map"
		]);
	});


	gulp.task("clean:docs:js:shared", function cleanJS() {
		return del([
			"src/documentation/js/shared"
		]);
	});

	gulp.task("clean:docs:html", function cleanJS() {
		return del([
			"src/documentation/css"
		]);
	});