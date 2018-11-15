//  ============================================================================================================
//  Dependencies
//  ============================================================================================================

import gulp from "gulp";
import gutil from "gulp-util";

import imagemin from "gulp-imagemin"

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
var production = (gutil.env.prod);
let maps = (gutil.env.maps);

//  ============================================================================================================
//  Tasks
//  ============================================================================================================

// Compile Scripts
gulp.task("images:raster", function copySVG(){
    gulp.src([
        "src/images/raster/**/*.*"
    ])
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/images/raster"))
});