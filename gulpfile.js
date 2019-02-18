var gulp = require("gulp");
var webserver = require("gulp-webserver");
var sass = require("gulp-sass");
var clean = require("gulp-clean-css");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");

// 编译sass
gulp.task("sass",function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./src/css'))
})
// 监听sass
gulp.task('watch',function(){
    gulp.watch('./src/scss/*.scss',gulp.series('sass'))
})

// 压缩css到dist
gulp.task('clean-css',function(){
    return gulp.src('./src/css/*.css')
        .pipe(clean())
        .pipe(gulp.dest("./dist/css"))
})


// 压缩js
gulp.task("concat",function(){
    return gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(babel({
            presets:"es2015"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
})

// 启动服务
gulp.task('server',function(){
    console.log(1)
    return gulp.src("./src")
        .pipe(webserver({
            port:8090,
            open:true,
            livereload:true
        }))
})




//默认
gulp.task("default",gulp.series("sass","webserver","watch"))


gulp.task('line',gulp.series("clean","concat"))







