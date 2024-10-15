const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require.main.require("./models/db_controller");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

module.exports = router;

router.get("/", function (req, res) {
  res.render("verify.ejs");
});

router.post("/", function (req, res) {
  const id = req.body.id;
  const token = req.body.token;
  db.matchtoken(id, token, function (err, result) {
    console.log(result);
    if (result.length > 0) {
      const email = result[0].email;
      const email_status = "verified";
      db.updateverify(email, email_status, function (err, result1) {
        res.redirect("/login");
      });
    } else {
      res.send("Token did not match");
    }
  });
});
