var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require ('multer');
var fs = require ('fs');
var path = require ('path');


var db = require.main.require ('./models/db_controller');


/**
 * Middleware to check if the user is logged in by verifying the presence of a 'username' cookie.
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
 * Multer storage configuration for handling file uploads.
 * - `destination`: Specifies the directory where uploaded files will be stored.
 * - `filename`: Specifies the name for the uploaded file (original name in this case).
 */
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "public/assets/images/upload_images"); //here we specify the destination. in this case i specified the current directory
    },
    filename: function(req, file, cb) {
      console.log(file); //log the file object info in console
      cb(null, file.originalname);//here we specify the file saving name. in this case. 
  //i specified the original file name .you can modify this name to anything you want
    }
  });

  var upload = multer({ storage: storage });


  /**
 * GET /doctors
 * Fetches all doctors from the database and renders the 'doctors.ejs' view with the list of doctors.
 */
router.get('/',function(req,res){

    db.getAllDoc(function(err,result){
        if(err)
        throw err;
        res.render('doctors.ejs',{list : result})
    });
    
});

// Middleware to parse URL-encoded and JSON request bodies.
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


/**
 * GET /doctors/add_doctor
 * Renders the 'add_doctor.ejs' view with the list of departments to choose from.
 */
router.get('/add_doctor',function(req,res){
    db.getalldept(function(err,result){
        res.render('add_doctor.ejs',{list:result});
    });

    
});


/**
 * POST /doctors/add_doctor
 * Handles the submission of the doctor addition form.
 * - Uploads an image and saves the doctor's details to the database.
 * - Redirects back to the add doctor page upon successful insertion.
 */
router.post('/add_doctor',upload.single("image"),function(req,res){

    

        db.add_doctor(req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender,req.body.address,req.body.phone,req.file.filename,req.body.department,req.body.biography);
    if(db.add_doctor){
        console.log('1 doctor inserted');
    }
    res.redirect('add_doctor');
    });

    router.get('/edit_doctor/:id',function(req,res){
        var id = req.params.id;

        db.getDocbyId(id,function(err,result){

            
                res.render('edit_doctor.ejs' ,{list : result});
           
            
        });
    });

    router.post('/edit_doctor/:id',function(req,res){
        var id = req.params.id;
        db.editDoc(id,req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender,req.body.address,req.body.phone,req.body.image,req.body.department,req.body.biography,function(err,result){
            if (err) throw err;
            
            //res.render('edit_doctor.ejs',{list:result});
        res.redirect('back');
         
        
            
        });
});


/**
 * GET /doctors/edit_doctor/:id
 * Renders the edit doctor form for the specified doctor ID.
 */
router.get('/delete_doctor/:id',function(req,res){
    var id = req.params.id;
    db.getDocbyId(id,function(err,result){
        res.render('delete_doctor.ejs',{list:result})
    });

    
});


/**
 * POST /doctors/delete_doctor/:id
 * Handles the deletion of a doctor from the database and redirects to the doctors list page.
 */
router.post('/delete_doctor/:id',function(req,res){
    var id = req.params.id;
    db.deleteDoc(id,function(err,result){

        res.redirect('/doctors');
    });
});







//  router.get('/search',function(req,res){
//      res.rende
//      var key = req.body.search;
//      console.log(key);
//     db.searchDoc(key,function(err, rows, fields) {
//         if (err) throw err;
//       var data=[];
//       for(i=0;i<rows.length;i++)
//         {
//           data.push(rows[i].first_name);
//         }
//         res.end(JSON.stringify(data));
//       });
//     });


/**
 * GET /doctors
 * Fetches all doctors from the database and renders the 'doctors.ejs' view with the list of doctors.
 */
router.get('/',function(req,res){
    db.getAllDoc(function(err,result){
        if(err)
            throw err;
        res.render('doctors.ejs',{list : result})
    });
});


/**
 * POST /doctors/search
 * Handles the search for doctors based on a search term.
 * Fetches matching doctors from the database and renders the 'doctors.ejs' view with the results.
 */
router.post('/search',function(req,res){
    var key = req.body.search;
    db.searchDoc(key,function(err,result){
        console.log(result);
        res.render('doctors.ejs',{list : result});
    });
});

module.exports = router;
