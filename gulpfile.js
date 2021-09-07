const { series, watch, src, dest } = require("gulp");
const fs = require("fs");
const bundleJSName = "build.js";
const minify = require("gulp-minify");
const cleanCSS = require("gulp-clean-css");
const zip = require("gulp-zip");
const sourceDir = "./js/";
const destinationDir = "./build/";

function isUpperCase(firstChar) {
  return firstChar == firstChar.toUpperCase();
}

function isLowerCase(firstChar) {
  return firstChar == firstChar.toLowerCase();
}

function areSameCase(firstChar1, firstChar2) {
  return (isUpperCase(firstChar1) && isUpperCase(firstChar2)) || (isLowerCase(firstChar1) && isLowerCase(firstChar2));
}

function createDestinationFolder(cb) {
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }
  cb();
}

function clean(cb) {
  if (fs.existsSync(destinationDir)) {
    fs.rmdirSync(destinationDir, { recursive: true, force: true });
  }
  cb();
}

function jsBundle(cb) {
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      throw err;
    }

    files.sort((str1, str2) => {
      if (areSameCase(str1.charAt(0), str2.charAt(0))) {
        return str1.localeCompare(str2);
      } else {
        return str2.charCodeAt(0) - str1.charCodeAt(2);
      }
    });

    const outputFileStream = fs.createWriteStream(destinationDir + bundleJSName, { flags: "w+" });
    files.forEach((file) => {
      const fileContent = fs.readFileSync(sourceDir + file);
      outputFileStream.write(fileContent + "\n\n");
    });
    outputFileStream.end();
    cb();
  });
}

function minifyJS(cb) {
  src(destinationDir + bundleJSName)
    .pipe(minify())
    .on("error", () => {
      console.log("Syntax error preventing to minimize while generating the new JS file. Stopping further execution.");
    })
    .pipe(dest(destinationDir));
  cb();
}

function minifyCSS(cb) {
  src("css/*.css")
    .pipe(cleanCSS())
    .on("error", () => {
      console.log("Syntax error preventing to minimize while generating the new CSS file. Stopping further execution.");
    })
    .pipe(dest(destinationDir));
  cb();
}

function zipBundle(cb) {
  src(destinationDir + "*")
    .pipe(zip("montfoc_game.zip"))
    .pipe(dest(destinationDir));
  cb();
}

function cleanBuildjs(cb) {
  try {
    console.log(destinationDir + bundleJSName);
    if (fs.existsSync(destinationDir + bundleJSName)) {
      // fs.unlinkSync(destinationDir + bundleJSName);
      console.log('EXISTS');
    }
  } catch (err) {
    console.log("Error on deleting file!");
  }
  cb();
}
exports.default = function () {
  watch(`${sourceDir}*.js`, series(clean, createDestinationFolder, jsBundle, minifyJS, minifyCSS));
};
exports.build = series(clean, createDestinationFolder, jsBundle, minifyJS, minifyCSS, cleanBuildjs);
exports.bundle = series(clean, createDestinationFolder, jsBundle, minifyJS, zipBundle);
