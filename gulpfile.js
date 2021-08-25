const { series } = require('gulp');

function  clean(cb) {
    cb();
}

function jsBundle(cb) {
    cb();
}

function minify(cb) {
    cb();
}

exports.build = series(clean, jsBundle, minify);
