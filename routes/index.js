var express = require("express");
var router = express.Router();

module.exports = router;
var express = require("express");
var router = express.Router();
const sqlite3 = require("sqlite3").verbose();

/* GET home page. */
router.get("/", function (_req, res) {
  var db = new sqlite3.Database(
    "mydb.sqlite3",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      //Query if the table exists if not lets create it on the fly!
      db.all(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='blog'`,
        (_err, rows) => {
          if (rows.length === 1) {
            console.log("Table exists!");
            db.all(` select blog_id, blog_txt from blog`, (_err, rows) => {
              console.log("returning " + rows.length + " records");
              res.render("index", { title: "Express", data: rows });
            });
          } else {
            console.log("Creating table and inserting some sample data");
            db.exec(
              `CREATE TABLE blog (
                     blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
                     blog_title text NOT NULL,
                     blog_txt text NOT NULL);

                     INSERT INTO blog (blog_title, blog_txt) VALUES ('This is a cool blog title','This is a great blog');`,
              () => {
                db.all(
                  ` SELECT blog_id, blog_title, blog_txt 
                    FROM blog`,
                  (_err, rows) => {
                    res.render("index", { title: "Express", data: rows });
                  }
                );
              }
            );
          }
        }
      );
    }
  );
});

router.get("/write", (req, res, next) => {
  res.render("writing");
}); 

router.post("/add", (req, res, _next) => {
  console.log("Adding blog to table without sanitizing input! YOLO BABY!!");
  var db = new sqlite3.Database(
    "mydb.sqlite3",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      console.log("inserting " + req.body.blog);
      //NOTE: This is dangerous! you need to sanitize input from the user
      //this is ripe for a exploit! DO NOT use this in production :)
      //Try and figure out how why this is unsafe and how to fix it.
      //HINT: the answer is in the XKCD comic on the home page little bobby tables :)
      
      db.exec(`insert into blog ( blog_txt) values ('${req.body.blog}');`);
      db.exec(`insert into blog ( blog_txt) values ('${req.body.blog}');`);
      //redirect to homepage
      res.redirect("/");
    }
  );
});

router.post("/delete", (req, res, _next) => {
  console.log("deleting stuff without checking if it is valid! SEND IT!");
  var db = new sqlite3.Database(
    "mydb.sqlite3",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      console.log("inserting " + req.body.blog);
      //NOTE: This is dangerous! you need to sanitize input from the user
      //this is ripe for a exploit! DO NOT use this in production :)
      //Try and figure out how why this is unsafe and how to fix it.
      //HINT: the answer is in the XKCD comic on the home page little bobby tables :)

      // check('username', 'Username Must Be an Email Address').trim().escape()
      // const { check, validationResult } = require('express-validator');

      db.exec(`delete from blog where blog_id='${req.body.blog}';`);
      res.redirect("/");
    }
  );
});

module.exports = router;
