'use strict';
//Plugins and modules

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


// Build --------------------------------------------------


gulp.task('build:html', () =>
    gulp.src('app/index.html')
    .pipe(gulp.dest('build'))
);

gulp.task('build:clean', ()=>
    del('build')
);

gulp.task('build:sass', ()=>
    gulp.src('app/blocks/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(rename('styles-v01.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'))
);

gulp.task('build:assets', () => {
        gulp.src('app/img/**/*.*')
            .pipe(gulp.dest('build/img'));
        gulp.src('app/fonts/**/*.*')
            .pipe(gulp.dest('build/fonts'));
        gulp.src('app/gallery/**/*.*')
            .pipe(gulp.dest('build/img/gallery'));
});

gulp.task('build', ['build:html', 'build:sass', 'build:assets']); // Entry point for build


gulp.task('build:watch', ()=> {
        gulp.watch('app/index.html', ['build:html', browserSync.reload]);
        gulp.watch('app/blocks/**/*.sass', ['build:sass', browserSync.reload]);
        gulp.watch('app/{img,fonts}/**/*.*', ['build:assets', browserSync.reload])
    }
);


// Common tasks --------------------------------------------

gulp.task('clean', ['build:clean']);

gulp.task('serve',()=>
    browserSync.init({
        server: 'build'
    })
);

gulp.task('default', ['build', 'serve', 'build:watch']);