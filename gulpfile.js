var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-ruby-sass');
var prefix      = require('gulp-autoprefixer');
var imagemin    = require('gulp-imagemin');
var uglify      = require('gulp-uglify');
var history     = require('connect-history-api-fallback')
var reload      = browserSync.reload;


gulp.task('browser-sync', function(){

   var files = [

      'app/**/*.html',
      'app/**/*.js',
      'assets/sass/**/*.sass',
      'assets/img/*',
      'index.html'

   ];

   browserSync(files, {

      server: './',
      notify: true,
      middleware: [ history() ]

   });

});

// Sass + prefix

gulp.task('sass', function(){

    return sass('assets/sass/main.sass', {

        style: 'compressed',
        loadPath: 'sass'

    })
    .on('error', function (err) {
        console.log('Error !', err.message);
    })
    .pipe(prefix({
        browsers: ['last 2 versions', '> 5%']
    }))
    .pipe(gulp.dest('app/static/styles'))
    .pipe(reload({stream: true}));

});


gulp.task('imagemin', function(){

    gulp.src('assets/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/static/img'));

});


gulp.task('watch', function () {

    // watch the jade files
    gulp.watch('assets/sass/**/*.sass', ['sass']); // watch the sass files
    gulp.watch('assets/img/*', ['imagemin']); // watch the img files

});


gulp.task('default', ["sass", "imagemin", "browser-sync", "watch"]);
