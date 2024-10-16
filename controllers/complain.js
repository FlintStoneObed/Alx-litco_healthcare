var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var db = require.main.require ('./models/db_controller');

var router = express.Router();

/**
 * Middleware to check if the user is logged in by checking the presence of a 'username' cookie.
 * If the cookie is missing, the user is redirected to the login page. Otherwise, the next middleware or route handler is executed.
 */
router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

/**
 * GET /complain
 * Renders the 'complain.ejs' view, which is likely a form for submitting complaints.
 */
router.get('/',function(req,res){
 
    res.render ('complain.ejs');
});

/**
 * POST /complain
 * Handles form submissions from the complain page.
 * - Extracts the complaint message, name, email, and subject from the form.
 * - Passes the data to the `db.postcomplain` function to save the complaint in the database.
 * - Redirects the user back to the same page after the complaint is submitted.
 */
router.post('/',function(req,res){

    var message = req.body.message;
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;

    db.postcomplain(message,name,email,subject,function(err,result){
        res.redirect('back');
    });

});


module.exports = router;
