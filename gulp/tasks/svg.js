//  ============================================================================================================
//  Dependencies
//  ============================================================================================================

import gulp from "gulp";
import gutil from "gulp-util";

import svgmin from "gulp-svgmin";

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
gulp.task("images:svg", function copySVG(){
    gulp.src([
        "src/images/svg/**/*.svg"
    ])
    .pipe(svgmin({
        "plugins": [
            { "cleanupAttributes": {
                "newlines": true,
                "trim": true,
                "spaces": true
            }},
            { "cleanupIDs": {
                "remove": true
            }},
            { "collapseGroups": true },
            { "mergePaths": {
                "collapseRepeated": true,
                "leadingZero": true,
                "negativeExtraSpace": true
            }},
            { "minifyStyles": {
                "usage": {
                    "force": false,
                    "ids": true,
                    "classes": true,
                    "tags": true
                }
            }},
            { "removeDoctype": false },
            { "removeTitle": true }
        ]
    }))
    .pipe(gulp.dest("dist/assets/images/svg"))
});