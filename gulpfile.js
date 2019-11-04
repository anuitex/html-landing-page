let gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    cache = require('gulp-cached'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    include = require('gulp-include'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'), 
    uglify = require('gulp-uglify') 

let path = {

    src: {
        html: 'app/makeup/*.html',
        js: 'app/makeup/js/**/*.js',
        style: 'app/makeup/scss/**/*.scss',
        img: 'app/makeup/img/**/*.*',
        fonts: 'app/makeup/fonts/**/*.*'
    },

    build: {
        html: './build/',
        js: './build/js/',
        css: './build/css/',
        img: './build/img/',
        fonts: './build/fonts/'
    },

    watch: {
        html: 'app/makeup/*.html',
        js: 'app/makeup/js/*.js',
        style: 'app/makeup/scss/**/*.scss',
        img: 'app/makeup/img/**/*.*',
        fonts: 'app/makeup/fonts/**/*.*'
    }
}

function fonts() {
    return gulp.src(path.src.fonts)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.fonts))
}


function img() {
    return gulp.src(path.src.img)
        .pipe(plumber())
        .pipe(cache('img'))
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imageminJpegRecompress({
                loops: 5,
                min: 65,
                max: 70,
                quality: 'medium'
            }),
            imagemin.svgo(),
            imagemin.optipng({
                optimizationLevel: 3
            }),
            imageminPngquant({
                quality: [0.7, 0.8],
                speed: 5
            })
        ], {
            verbose: true
        }))
        .pipe(gulp.dest(path.build.img))
}

function html() {
    return gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(include())
        .pipe(gulp.dest(path.build.html));
}

function style() {
    return gulp.src(path.src.style)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        })).on('error', sass.logError)
        .pipe(autoprefixer({
            browsers: ['last 1 version']
        }))
        .pipe(cleancss({
            compatibility: '*'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
}

function script() {
    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(include())
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest(path.build.js));
}

function watch() {
    gulp.watch(path.watch.fonts, fonts);
    gulp.watch(path.watch.img, img);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.style, style);
    gulp.watch(path.watch.js, script);
}

gulp.task("fonts", fonts);
gulp.task("img", img);
gulp.task("html", html);
gulp.task("style", style);
gulp.task("script", script);
gulp.task("watch", watch);

gulp.task("build", gulp.parallel(fonts, img, html, style, script));
gulp.task("dev", gulp.series('build', 'watch'));