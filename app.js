var createError = require("http-errors");
var express = require("express");

var path = require("path");
//https://liquidjs.com/tutorials/use-in-expressjs.html
var { Liquid } = require("liquidjs");
var engine = new Liquid();

var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();
// npm sanitize instructions
app.use(require('sanitize').middleware);
app.get('/ping', function(req, res) {
	var param = req.queryInt('param');
	res.send('pong ' + (typeof param) + ' ' + param);
});
app.listen(8080);
// liquid engine setup
app.engine("liquid", engine.express());
app.set("views", "./views"); // specify the views directory
app.set("view engine", "liquid"); // set liquid to default
//https://liquidjs.com/tutorials/use-in-expressjs.html

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
