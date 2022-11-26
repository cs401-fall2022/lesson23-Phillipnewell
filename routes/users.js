var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

/* GET user new form. */
router.get("/new", function (req, res) {
  res.send("respond with a resource");
});

const usersRouter = require("./routes/users");

module.exports = router;
