// Инициализируем плагины
var gulp = require('gulp');
var less = require('gulp-less');
var webserver = require('gulp-webserver');
var del = require('del');
var rename = require('gulp-rename');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');

//var gutil = require('gulp-util');

// var imagemin = require('gulp-imagemin');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var minifyCSS = require('gulp-minify-css');

// var nib = require('nib');
// var cssbeautify = require('gulp-cssbeautify');
// var cache = require('gulp-cache');
// var path = require('path');
// var watch = require('gulp-watch');
// var clean = require('gulp-clean');


// Функция обработки ошибок
// handleError = function(err) {
//     gutil.log(err);
//     gutil.beep();
// };




// Локальный сервер
gulp.task('webserver', function() {
    gulp.src('public')
    .pipe(webserver({
        host: 'localhost',
        port: 3000,
        livereload: true
    }));
});

//Стили
gulp.task('less', function () {
  gulp.src('develop/assets/less/styles.less')
    .pipe(less())
    //.on('error', handleError)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(rename('styles.css'))
    // .pipe(minifyCSS({
    //     keepBreaks:false
    // }))
    // .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('public/assets/css'));
});

//Twig
gulp.task('twig-compile', function () {
    'use strict';
    var twig = require('gulp-twig');
    return gulp.src(['develop/pages/**/*.twig', '!./develop/pages/layouts/*.twig'])
        .pipe(twig({
            data: {
                title: 'Gulp and Twig',
                benefits: [
                    'Fast',
                    'Flexible',
                    'Secure'
                ]
            }
        }))
        //.on('error', handleError)
        .pipe(gulp.dest('public'));
});


//Копируем скрипты
gulp.task('js', function() {
    gulp.src('develop/assets/js/**/*')
        //.on('error', handleError)
        // .pipe(concat('all.js'))
        // .pipe(gulp.dest('./dist'))
        // .pipe(rename('all.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'));
});


//Копируем изображения и сразу их обновляем
gulp.task('images', function() {
    gulp.src('develop/assets/images/**/*')
        //.on('error', handleError)
        //.pipe(imagemin())
        .pipe(gulp.dest('public/assets/images'));
});
// gulp.task('clean-img', function(cb) {
//     del(['public/assets/images/**/*'], cb)
// });


//Собираем спрайт
gulp.task('sprite', function () {
    var spriteData = gulp.src('develop/assets/images/sprite/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.less',
        imgPath:'/assets/images/sprite.png',
        algorithm:'binary-tree',
        cssFormat:'css'
    }));
    spriteData.img.pipe(gulp.dest('develop/assets/images/'));
    spriteData.css.pipe(gulp.dest('develop/assets/less/libs/'));
});

//Копируем шрифты
gulp.task('fonts', function() {
    gulp.src('develop/assets/less/libs/fonts/**/*')
        .pipe(gulp.dest('public/assets/css/fonts'));
});




//Очищаем паблик
gulp.task('clean', function(cb) {
    del(['public/*', 'public/assets/css', 'public/assets/css/fonts', 'public/assets/js', 'public/assets/images/**/*'], cb)
});


gulp.task('r', function() {
    gulp.src('public/**/*')
        .pipe(gulp.dest('release'));
});
gulp.task('c', function(cb) {
    del(['release/**/*']);
});



//Следим
gulp.task("watch", function(){
    gulp.watch(['develop/assets/less/**/*', '!develop/assets/less/libs/bootstrap/**/*', '!develop/assets/less/libs/fonts/**/*'], ['less']);
    gulp.watch('develop/**/*.twig', ['twig-compile']);
    gulp.watch('develop/assets/images/**/*', ['images']);
    gulp.watch('develop/assets/images/sprite/*.png', ['sprite']);
    gulp.watch(['develop/assets/js/**/*', '!develop/assets/js/libs/fancybox/**/*'], ['js']);
});

gulp.task('build', ['twig-compile', 'less', 'images', 'js', 'sprite', 'fonts']);

gulp.task('default', ['clean'], function() {
    gulp.start('build', 'watch', 'webserver');
});