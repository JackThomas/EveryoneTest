//  ============================================================================================================
//  Dependencies
//  ============================================================================================================

	import gulp from "gulp";
	import gutil from "gulp-util";

	import assemble from "assemble";
	import rename from "gulp-rename";

	// Check Enviroment
	var production = (gutil.env.prod);


//  ============================================================================================================
//  Tasks
//  ============================================================================================================
	var app = assemble();

	// Prepare HBS Files
	gulp.task("prepare-assemble", ["clean:html"], function prepareAssemble(complete) {
		app.layouts("src/html/layouts/**/*.hbs");
		app.data("src/html/layouts/**/*.json");
		app.partials("src/html/partials/**/*.hbs");
		app.pages("src/html/pages/**/*.hbs");
		complete();
	});

	// Render Pages
	gulp.task("assemble", ["prepare-assemble"], function assemble() {
		return app.toStream("pages")
			.pipe(app.renderFile({ "flatten": true }))
			.on("error", console.log)
			.pipe(rename({ extname: ".html" }))
			.pipe(app.dest("dist"));
	});

