import gulp from "gulp";

//  ============================================================================================================
//  Tasks
//  ============================================================================================================

gulp.task('videos', function () {
    return gulp.src('./src/videos/*')
    .pipe(gulp.dest('./dist/assets/videos/'))
});