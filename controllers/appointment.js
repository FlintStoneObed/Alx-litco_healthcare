var express = require ('express');
var router = express.Router();
var db = require.main.require ('./models/db_controller');
var bodyPaser = require ('body-parser');

/**
 * Middleware to check if the user is authenticated. If the user is not logged in,
 * they will be redirected to the login page.
 * This middleware runs for all routes ('*').
 */
router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

/**
 * Route to fetch and display all appointments.
 * Renders the 'appointment.ejs' view with a list of appointments retrieved from the database.
 */
router.get('/',function(req,res){
    db.getallappointment(function(err,result){
        console.log(result);
        res.render('appointment.ejs',{list :result});
    })
    
});

/**
 * Route to display the form for adding a new appointment.
 * Renders the 'add_appointment.ejs' view.
 */
router.get('/add_appointment',function(req,res){
    res.render('add_appointment.ejs');
});

/**
 * Route to handle the submission of a new appointment.
 * The appointment details are passed via the request body and inserted into the database.
 * After successful insertion, redirects to the '/appointment' route.
 */
router.post('/add_appointment',function(req,res){

    db.add_appointment(req.body.p_name,req.body.department,req.body.d_name,req.body.date,req.body.time,req.body.email,req.body.phone,function(err,result){
        res.redirect('/appointment');
    });

});

/**
 * Route to fetch and display the appointment to be edited based on the ID.
 * Renders the 'edit_appointment.ejs' view with the appointment details.
 * @param {string} id - The ID of the appointment to edit.
 */
router.get('/edit_appointment/:id',function(req,res){
    var id = req.params.id;
    db.getappointmentbyid(id,function(err,result){
        console.log(result);
        res.render('edit_appointment.ejs',{list : result});
    });

});

/**
 * Route to handle the submission of edited appointment details.
 * The updated appointment details are passed via the request body and updated in the database.
 * After a successful update, redirects to the '/appointment' route.
 * @param {string} id - The ID of the appointment to edit.
 */
router.post('/edit_appointment/:id',function(req,res){
    var id = req.params.id;
    db.editappointment(id,req.body.p_name,req.body.department,req.body.d_name,req.body.date,req.body.time,req.body.email,req.body.phone,function(err,result){
        res.redirect('/appointment');
    });
});

/**
 * Route to fetch and display the appointment to be deleted based on the ID.
 * Renders the 'delete_appointment.ejs' view with the appointment details.
 * @param {string} id - The ID of the appointment to delete.
 */
router.get('/delete_appointment/:id',function(req,res){
    var id = req.params.id;
    db.getappointmentbyid(id,function(err,result){
        console.log(result);
        res.render('delete_appointment.ejs',{list:result});
    })
    
});

/**
 * Route to handle the deletion of an appointment based on the ID.
 * After successful deletion, redirects to the '/appointment' route.
 * @param {string} id - The ID of the appointment to delete.
 */
router.post('/delete_appointment/:id',function(req,res){
    var id =req.params.id;
    db.deleteappointment(id,function(err,result){
        res.redirect('/appointment');
    });
})


module.exports =router;
