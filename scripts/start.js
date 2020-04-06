var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
const devPort = 3000;
const config = require("../config/webpack.config");
let compiler = webpack(config);
let devServer = new WebpackDevServer(compiler, config.devServer);
devServer.listen(devPort, "localhost", function (err) {
    if (err) {
        console.log(err);
    }
    console.log("Listening at localhost:5000");
});