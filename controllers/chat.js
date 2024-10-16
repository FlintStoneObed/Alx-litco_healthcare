var mysql =require('mysql');
var express = require ('express');
var cookie = require ('cookie-parser');
var router = express.Router();
var app = express();
var io = require("socket.io");


/**
 * Route to render the chat page.
 * Renders the 'chat.ejs' view when a user navigates to the root URL ('/').
 */
router.get('/',function(req,res){
    res.render('chat.ejs');
});


module.exports = router;
