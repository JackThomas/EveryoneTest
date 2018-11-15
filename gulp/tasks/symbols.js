//  ============================================================================================================
//  Dependencies
//  ============================================================================================================

    var gulp = require("gulp");

    var path = require("path");
    var rename = require("gulp-rename");

    var svg_store = require("gulp-svgstore");
    var svgmin = require("gulp-svgmin");


//  ============================================================================================================
//  Tasks
//  ============================================================================================================

    //  For plug-ins see: https://github.com/svg/svgo/tree/master/plugins
    gulp.task("symbols:web", function() {
        return gulp.src("src/images/symbols/**/*.svg")
            .pipe(svgmin(function(file) {
                var prefix = path.basename(file.relative, path.extname(file.relative));
                return {
                    plugins: [{
                        mergePaths: false,  //  We disable path merging to ensure fill colouring is possible.
                        cleanupIDs: {
                            prefix: prefix + '-',
                            minify: true
                        }
                    }]
                };
            }))
            .pipe(svg_store())
            .pipe(rename({ basename: "symbols" }))
            //  We require to place this so our SASS PostCSS task can inline SVG where required
            .pipe(gulp.dest("dist/assets/images"));
    });

    //  For plug-ins see: https://github.com/svg/svgo/tree/master/plugins
    gulp.task("symbols:inline", function() {
        return gulp.src("src/images/inline/**/*.svg")
            .pipe(svgmin(function(file) {
                var prefix = path.basename(file.relative, path.extname(file.relative));
                return {
                    plugins: [{
                        mergePaths: false,  //  We disable path merging to ensure fill colouring is possible.
                        cleanupIDs: {
                            prefix: prefix + '-',
                            minify: true
                        }
                    }]
                };
            }))
            .pipe(svg_store())
            .pipe(rename({ basename: "inline" }))
            //  We require to place this so our SASS PostCSS task can inline SVG where required
            .pipe(gulp.dest("src/scss/symbols"));
    });