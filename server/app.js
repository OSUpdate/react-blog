var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var cors = require("cors");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("etag", false);
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json({limit: 500000000}));
app.use(bodyParser.urlencoded({limit: 50000000, extended: true, parameterLimit:50000}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var options = {
    dotfiles: "ignore",
    etag: false,
    extensions: ["htm", "html"],
    index: false,
    maxAge: "1d",
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set("x-timestamp", Date.now());
    }
};
app.use(express.static(path.join(__dirname, "public"),options));

app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: true
}));

app.use("/", indexRouter);
app.use("/api", apiRouter);
//app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.redirect( "http://127.0.0.1:3000/404");
    res.end();
});

module.exports = app;
