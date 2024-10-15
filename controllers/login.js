var express = require("express");
var mysql = require("mysql");
var session = require("express-session");
var router = express.Router();
var bodyParser = require("body-parser");
var sweetalert = require("sweetalert2");
const { check, validationResult } = require("express-validator");

// Database connection setup
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hms_project",
});

// Middleware
router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// GET request - render login page
router.get("/", function (req, res) {
  res.render("login.ejs");
});

// POST request - login logic
router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  function (request, response) {
    // Validate inputs
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(422).json({ errors: errors.array() });
    }

    const username = request.body.username;
    const password = request.body.password;

    if (username && password) {
      // Use parameterized query to prevent SQL injection
      const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
      con.query(query, [username, password], function (error, results) {
        if (error) {
          console.error("Database query error:", error);
          return response.status(500).send("Internal server error");
        }

        if (Array.isArray(results) && results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.cookie("username", username);

          const status = results[0].email_status;
          if (status === "not_verified") {
            response.send("Please verify your email");
          } else {
            sweetalert.fire("Logged In!");
            response.redirect("/home");
          }
        } else {
          response.status(401).send("Incorrect username or password");
        }
        response.end();
      });
    } else {
      response.status(400).send("Please enter username and password");
      response.end();
    }
  }
);

module.exports = router;
