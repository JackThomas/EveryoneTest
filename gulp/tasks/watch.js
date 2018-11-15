//  ============================================================================================================
//  Dependencies
//  ============================================================================================================

import gulp from "gulp";
import util from "gulp-util";

import opn from "opn";
import browsersync from "browser-sync";


// Check Enviroment
var production = (util.env.prod);

//	Reload our browsers
function reload(complete) {
	browsersync.reload();
	complete();
}



//  ============================================================================================================
//  Configure browser reload
//  ============================================================================================================

// Configure browsersync
gulp.task("browsersync", function (complete) {
	browsersync.create();
	browsersync.init({
		server: "./dist/",
		baseDir: "./dist/",
		open: false,
		online: false
	},
		function (error, browsersync) {
			require("opn")(browsersync.options.getIn(["urls", "local"]), {
				app: ["Google Chrome", "--remote-debugging-port=9222"]
			});
		});
	complete();
});


//  ============================================================================================================
//  Set up watch tasks
//  ============================================================================================================
gulp.task("watch:assemble", ["assemble"], reload);
gulp.task("watch:sass", ["sass"], reload);
gulp.task("watch:browserify", ["browserify"], reload);

