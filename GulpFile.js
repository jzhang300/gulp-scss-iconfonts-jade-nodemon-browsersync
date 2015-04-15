/**
 * Module Dependencies
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var iconfont = require('gulp-iconfont');
var iconfontCSS = require('gulp-iconfont-css');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;

/**
 * Gulp Tasks
 */

gulp.task('default', ['browser-sync', 'compile'], function() {
    gulp.watch(['public/img/icons/*.svg'], ['icon-fonts']);
    gulp.watch(['public/scss/**/*.*'], ['sass']);
    gulp.watch(['public/js/**/*.*'], ['scripts']);
    gulp.watch(['views/**/*.*'], ['bs-reload']);
});

// compile everything
gulp.task('compile', ['sass', 'scripts', 'icon-fonts']);

// Reload all Browser windows
gulp.task('bs-reload', function() {
    browserSync.reload();
});

// browser-sync start server
gulp.task('browser-sync', ['nodemon'], function() {
    browserSync({
        proxy: "localhost:3000", // local node app address
        port: 5000, // use *different* port than above
        notify: true
    });
});

// initiate nodemon
gulp.task('nodemon', function(cb) {
    var called = false;
    return nodemon({
        script: 'app.js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
        ]
    })
    .on('start', function() {
        if (!called) {
            called = true;
            cb();
        }
    })
    .on('restart', function() {
        setTimeout(function() {
            reload({
                stream: false
            });
        }, 1000);
    });
});

// compile sass to main.css
gulp.task('sass', function() {
    return gulp.src(['public/scss/*.scss'])
        .pipe(sass({
            errLogToConsole: true
        }))
        // .pipe(minifyCSS())
        .pipe(gulp.dest('public/css'))
        .pipe(reload({stream:true}));
});

// compile js to main.js
gulp.task('scripts', function() {
    return gulp.src([
            'public/js/vendors/_jquery.js',
            'public/js/*.js'
        ])
        .pipe(concat('main.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('public/dist/'))
        .pipe(reload({stream:true}));
});

// compile icons to icon-fonts
gulp.task('icon-fonts', function(){
  gulp.src(['public/img/icons/*.svg'])
    .pipe(iconfontCSS({
        fontName: 'icons',
        targetPath: '../scss/modules/_icon-fonts.scss',
        fontPath: '../fonts/'
    }))
    .pipe(iconfont({
        fontName: 'icons', // required 
        appendCodepoints: true, // recommended option
        normalize: true
    }))
    .on('codepoints', function(codepoints, options) {
        // CSS templating, e.g. 
        console.log(codepoints, options);
    })
    .pipe(gulp.dest('./public/fonts/'))
    .pipe(reload({stream:true}));
});