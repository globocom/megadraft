var makeConfig = require("./makewebpackconfig.js");

module.exports = makeConfig({
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "Megadraft.js",
    library: "megadraft",
    libraryTarget: "umd"
  }
});
