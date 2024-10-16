// Import required modules
var mysql = require("mysql");
var express = require("express");
var router = express.Router();

// MySQL database connection configuration
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hms_project",
});

// Connect to the MySQL database
con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("you are connected");
  }
});

/**
 * Insert a new user into the users table
 * @param {string} username - The username of the user
 * @param {string} email - The email address of the user
 * @param {string} password - The user's password
 * @param {string} status - The email verification status of the user
 * @param {function} callback - Callback function to handle the query result
 */
module.exports.signup = function (username, email, password, status, callback) {
  var query =
    "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "','" +
    status +
    "')";
  con.query(query, callback);
};

/**
 * Retrieve user details from the verify table by email
 * @param {string} email - Email address to look up
 * @param {function} callback - Callback function to handle the query result
 */
module.exports.getuserid = function (email, callback) {
  var query = "select *from verify where email = '" + email + "' ";
  con.query(query, callback);
};

/**
 * Add verification details for a user
 * @param {string} username - The username of the user
 * @param {string} email - The user's email address
 * @param {string} token - Verification token
 * @param {function} callback - Callback function to handle the query result
 */
module.exports.verify = function (username, email, token, callback) {
  const query =
    "insert into `verify` (`username`,`email`,`token`) values ('" +
    username +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

/**
 * Add a doctor to the doctor table
 * @param {string} first_name - Doctor's first name
 * @param {string} last_name - Doctor's last name
 * @param {string} email - Doctor's email address
 * @param {string} dob - Doctor's date of birth
 * @param {string} gender - Doctor's gender
 * @param {string} address - Doctor's address
 * @param {string} phone - Doctor's phone number
 * @param {string} image - URL to the doctor's image
 * @param {string} department -  Doctor's department
 * @param {string} biography - Doctor's biography
 * @param {function} callback - Callback function to handle the query result
 */
module.exports.add_doctor = function (
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  department,
  biography,
  callback
) {
  var query =
    "INSERT INTO `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) values ('" +
    first_name +
    "','" +
    last_name +
    "','" +
    email +
    "','" +
    dob +
    "','" +
    gender +
    "','" +
    address +
    "','" +
    phone +
    "','" +
    image +
    "','" +
    department +
    "','" +
    biography +
    "')";
  con.query(query, callback);
  console.log(query);
};

/**
 * Retrieve all doctors from the doctor table
 * @param {function} callback - Callback function to handle the query result
 */
module.exports.getAllDoc = function (callback) {
  var query = "select * from doctor";
  con.query(query, callback);
};

/**
 * Retrieve a doctor by ID from the doctor table
 * @param {string} id - Doctor's ID
 * @param {function} callback - Callback function to handle the query result
 */
module.exports.getDocbyId = function (id, callback) {
  var query = "select * from doctor where id =" + id;
  con.query(query, callback);
};

/**
 * Retrieve an employee by ID from the employee table
 * @param {string} id - Employee's ID
 * @param {string} callback - Callback function to handle the query result
 */
module.exports.getEmpbyId = function (id, callback) {
  var query = "select * from employee where id =" + id;
  con.query(query, callback);
};

/**
 * Edit a doctor's details by ID
 * @param {string} id -  Doctor's ID
 * @param {string} first_name - Doctor's first name
 * @param {string} last_name - Doctor's last name
 * @param {string} email - Doctor's email address
 * @param {string} dob - Doctor's date of birth
 * @param {string} gender - Doctor's gender
 * @param {string} address - Doctor'address
 * @param {string} phone - Doctor's phone number
 * @param {string} image - Doctor's image or profile picture
 * @param {string} department - Department the doctor is associated with
 * @param {string} biography - Short biography or description of the doctor
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.editDoc = function (
  id,
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  department,
  biography,
  callback
) {
  var query =
    "update `doctor` set `first_name`='" +
    first_name +
    "', `last_name`='" +
    last_name +
    "', `email`='" +
    email +
    "', `dob`='" +
    dob +
    "',`gender`='" +
    gender +
    "',`address`='" +
    address +
    "',`phone`='" +
    phone +
    "',`image`='" +
    image +
    "',`department`='" +
    department +
    "',`biography`='" +
    biography +
    "' where id=" +
    id;
  con.query(query, callback);
  // console.log(query);
};

/**
 * Delete a doctor by ID
 * @param {string} id - Doctor's ID
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.editEmp = function (
  id,
  name,
  email,
  contact,
  join_date,
  role,
  callback
) {
  var query =
    "update `employee` set `name`='" +
    name +
    "', `email`='" +
    email +
    "', `contact`='" +
    contact +
    "', `join_date`='" +
    join_date +
    "', `role`='" +
    role +
    "' where id=" +
    id;
  con.query(query, callback);
};

/**
 * Delete a doctor by ID
 * @param {string} id - Doctor's ID
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.deleteDoc = function (id, callback) {
  //console.log("i m here");
  var query = "delete from doctor where id=" + id;
  con.query(query, callback);
};

/**
 * Delete an employee by ID
 * @param {string} id - Employee's ID
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.deleteEmp = function (id, callback) {
  //console.log("i m here");
  var query = "delete from employee where id=" + id;
  con.query(query, callback);
};

/**
 * Delete a medication by ID from the store
 * @param {string} id - Medication ID
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.deletemed = function (id, callback) {
  //console.log("i m here");
  var query = "delete from store where id=" + id;
  con.query(query, callback);
};

/**
 * Insert a new complaint
 * @param {string} message - Complaint message
 * @param {string} name - Name of the person submitting the complaint
 * @param {string} email - Email of the person submitting the complaint
 * @param {string} subject - Subject of the complaint
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.postcomplain = function (
  message,
  name,
  email,
  subject,
  callback
) {
  var query =
    "insert into complain (message,name,email,subject) values ('" +
    message +
    "','" +
    name +
    "','" +
    email +
    "','" +
    subject +
    "')";
  console.log(query);
  con.query(query, callback);
};

/**
 * Retrieve all complaints
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.getcomplain = function (callback) {
  var query = "select * from complain";
  con.query(query, callback);
};

/**
 * Insert a new appointment
 * @param {string} p_name - Patient's name
 * @param {string} department - Department for the appointment
 * @param {string} d_name - Doctor's name
 * @param {string} date - Date of the appointment
 * @param {string} time - Time of the appointment
 * @param {string} email - Patient's email address
 * @param {string} phone - Patient's phone number
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.add_appointment = function (
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "insert into appointment (patient_name,department,doctor_name,date,time,email,phone) values ('" +
    p_name +
    "','" +
    department +
    "','" +
    d_name +
    "','" +
    date +
    "','" +
    time +
    "','" +
    email +
    "','" +
    phone +
    "')";
  con.query(query, callback);
};

/**
 * Retrieve all appointments
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.getallappointment = function (callback) {
  var query = "select * from appointment";
  con.query(query, callback);
};

/**
 * Search doctors by first name
 * @param {string} key - Search key for the doctor's first name
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.searchDoc = function (key, callback) {
  var query = 'SELECT  *from doctor where first_name like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

/**
 * Search medicines by name
 * @param {string} key - Search key for the medicine's name
 * @param {function} callback - Callback function for handling the query result
 */
module.exports.searchmed = function (key, callback) {
  var query = 'SELECT  *from store where name like "%' + key + '%"';
  con.query(query, callback);
};

/**
 * Searches for employees by name.
 * @param {string} key - The search keyword for employee names.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.searchEmp = function (key, callback) {
  var query = 'SELECT  *from employee where name  like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

/**
 * Retrieves appointment details by appointment ID.
 * @param {number} id - The appointment ID.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.getappointmentbyid = function (id, callback) {
  var query = "select * from appointment where id=" + id;
  console.log(query);
  con.query(query, callback);
};

/**
 * Updates an appointment's details.
 * @param {number} id - The appointment ID.
 * @param {string} p_name - The patient's name.
 * @param {string} department - The department name.
 * @param {string} d_name - The doctor's name.
 * @param {string} date - The appointment date.
 * @param {string} time - The appointment time.
 * @param {string} email - The patient's email.
 * @param {string} phone - The patient's phone number.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.editappointment = function (
  id,
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "update appointment set patient_name='" +
    p_name +
    "',department='" +
    department +
    "',doctor_name='" +
    d_name +
    "',date='" +
    date +
    "',time='" +
    time +
    "',email='" +
    email +
    "',phone='" +
    phone +
    "' where id=" +
    id;
  con.query(query, callback);
};

/**
 * Deletes an appointment by ID.
 * @param {number} id - The appointment ID.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.deleteappointment = function (id, callback) {
  var query = "delete from appointment where id=" + id;
  con.query(query, callback);
};
//module.exports =router;

/**
 * Finds a user by email.
 * @param {string} email - The user's email.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.findOne = function (email, callback) {
  var query = "select *from users where email='" + email + "'";
  con.query(query, callback);
  console.log(query);
};

/**
 * Inserts a temporary token for a user.
 * @param {number} id - The user ID.
 * @param {string} email - The user's email.
 * @param {string} token - The temporary token.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.temp = function (id, email, token, callback) {
  const query =
    "insert into `temp` (`id`,`email`,`token`) values ('" +
    id +
    "','" +
    email +
    "','" +
    token +
    "')";
  con.query(query, callback);
};

/**
 * Checks if a token exists in the temp table.
 * @param {string} token - The token to search for.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.checktoken = function (token, callback) {
  const query = "select * from temp where token='" + token + "'";
  con.query(query, callback);
  console.log(query);
};

/**
 * Updates the password for a user.
 * @param {number} id - The user ID.
 * @param {string} newpassword - The new password.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.setpassword = function (id, newpassword, callback) {
  const query =
    "update `users` set `password`='" + newpassword + "' where id=" + id;
  con.query(query, callback);
};

/**
 * Adds a new employee to the employee table.
 * @param {string} name - The employee's name.
 * @param {string} email - The employee's email.
 * @param {string} contact - The employee's contact information.
 * @param {string} join_date - The date the employee joined.
 * @param {string} role - The employee's role.
 * @param {number} salary - The employee's salary.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.add_employee = function (
  name,
  email,
  contact,
  join_date,
  role,
  salary,
  callback
) {
  var query =
    "Insert into `employee` (`name`,`email`,`contact`,`join_date`,`role`,`salary`) values ('" +
    name +
    "','" +
    email +
    "','" +
    contact +
    "','" +
    join_date +
    "','" +
    role +
    "','" +
    salary +
    "')";
  con.query(query, callback);
  console.log(query);
};

/**
 * Adds a new medicine to the store.
 * @param {string} name - The name of the medicine.
 * @param {string} p_date - The production date.
 * @param {string} expire - The expiration date.
 * @param {string} e_date - The expiration end date.
 * @param {number} price - The price of the medicine.
 * @param {number} quantity - The quantity available.
 * @param {function} callback - The callback function to handle query results.
 */
module.exports.addMed = function (
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "Insert into `store` (name,p_date,expire,expire_end,price,quantity) values('" +
    name +
    "','" +
    p_date +
    "','" +
    expire +
    "','" +
    e_date +
    "','" +
    price +
    "','" +
    quantity +
    "')";
  console.log(query);
  con.query(query, callback);
};

/**
 * Fetches medication details by its ID.
 * @param {number} id - The ID of the medication.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.getMedbyId = function (id, callback) {
  var query = "select * from store where id=" + id;
  con.query(query, callback);
};

/**
 * Updates medication details in the store.
 * @param {number} id - The ID of the medication.
 * @param {string} name - The name of the medication.
 * @param {string} p_date - The production date of the medication.
 * @param {string} expire - The expiration date of the medication.
 * @param {string} e_date - The expiration end date of the medication.
 * @param {number} price - The price of the medication.
 * @param {number} quantity - The quantity of the medication in stock.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.editmed = function (
  id,
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  var query =
    "update store set name='" +
    name +
    "', p_date='" +
    p_date +
    "',expire='" +
    expire +
    "' ,expire_end='" +
    e_date +
    "',price='" +
    price +
    "',quantity='" +
    quantity +
    "' where id=" +
    id;
  console.log(query);
  con.query(query, callback);
};

/**
 * Retrieves all medications from the store.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.getallmed = function (callback) {
  var query = "select *from store order by id desc";
  console.log(query);
  con.query(query, callback);
};

/**
 * Retrieves all employees from the employee table.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.getAllemployee = function (callback) {
  var query = "select * from employee";
  con.query(query, callback);
};

/**
 * Adds a new leave request for an employee.
 * @param {string} name - The name of the employee.
 * @param {number} id - The employee ID.
 * @param {string} type - The type of leave (e.g., sick leave, vacation).
 * @param {string} from - The start date of the leave.
 * @param {string} to - The end date of the leave.
 * @param {string} reason - The reason for the leave.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.add_leave = function (
  name,
  id,
  type,
  from,
  to,
  reason,
  callback
) {
  var query =
    "Insert into `leaves` (`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) values ('" +
    name +
    "','" +
    id +
    "','" +
    type +
    "','" +
    from +
    "','" +
    to +
    "','" +
    reason +
    "')";
  console.log(query);
  con.query(query, callback);
};

/**
 * Retrieves all leave records from the leaves table.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.getAllLeave = function (callback) {
  var query = "Select * from leaves";
  con.query(query, callback);
};

/**
 * Matches a token with the corresponding record in the verify table.
 * @param {number} id - The ID associated with the token.
 * @param {string} token - The token to match.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.matchtoken = function (id, token, callback) {
  var query = "select * from `verify` where token='" + token + "' and id=" + id;
  con.query(query, callback);
  console.log(query);
};

/**
 * Updates the email status of a user in the users table.
 * @param {string} email - The email of the user.
 * @param {string} email_status - The new email status to set (e.g., verified).
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.updateverify = function (email, email_status, callback) {
  var query =
    "update `users` set `email_status`='" +
    email_status +
    "' where `email`='" +
    email +
    "'";
  con.query(query, callback);
};

/**
 * Adds a new department.
 * @param {string} name - The name of the department.
 * @param {string} desc - The description of the department.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.add_dept = function (name, desc, callback) {
  var query =
    "insert into departments(department_name,department_desc) values ('" +
    name +
    "','" +
    desc +
    "')";
  con.query(query, callback);
};

/**
 * Retrieves all departments.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.getalldept = function (callback) {
  var query = "select * from departments";
  con.query(query, callback);
};

/**
 * Deletes a department by its ID.
 * @param {number} id - The ID of the department to delete.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.delete_department = function (id, callback) {
  var query = "delete from departments where id=" + id;
  con.query(query, callback);
};

/**
 * Retrieves department details by its ID.
 * @param {number} id - The ID of the department.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.getdeptbyId = function (id, callback) {
  var query = "select * from departments where id=" + id;
  con.query(query, callback);
};

/**
 * Edits a department's details.
 * @param {number} id - The ID of the department to edit.
 * @param {string} name - The new name of the department.
 * @param {string} desc - The new description of the department.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.edit_dept = function (id, name, desc, callback) {
  var query =
    "update departments set department_name='" +
    name +
    "',department_desc='" +
    desc +
    "' where id=" +
    id;
  con.query(query, callback);
};

/**
 * Retrieves user details by username.
 * @param {string} username - The username of the user.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.getuserdetails = function (username, callback) {
  var query = "select * from users where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};

/**
 * Edits a user's profile details.
 * @param {number} id - The ID of the user to edit.
 * @param {string} username - The new username of the user.
 * @param {string} email - The new email of the user.
 * @param {string} password - The new password of the user.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.edit_profile = function (
  id,
  username,
  email,
  password,
  callback
) {
  var query =
    "update users set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where id=" +
    id;
  con.query(query, callback);
  console.log(query);
};

/**
 * Retrieves leave details by its ID.
 * @param {number} id - The ID of the leave.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.getleavebyid = function (id, callback) {
  var query = "select * from leaves where id=" + id;
  con.query(query, callback);
};

/**
 * Deletes a leave request by its ID.
 * @param {number} id - The ID of the leave to delete.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.deleteleave = function (id, callback) {
  var query = "delete  from leaves where id=" + id;
  con.query(query, callback);
};

/**
 * Edits a leave request's details.
 * @param {number} id - The ID of the leave to edit.
 * @param {string} name - The name of the employee requesting the leave.
 * @param {string} leave_type - The type of leave (e.g., sick leave, vacation).
 * @param {string} from - The start date of the leave.
 * @param {string} to - The end date of the leave.
 * @param {string} reason - The reason for the leave.
 * @param {function} callback - The callback to execute once the query is completed.
 */
module.exports.edit_leave = function (
  id,
  name,
  leave_type,
  from,
  to,
  reason,
  callback
) {
  var query =
    "update leaves set employee='" +
    name +
    "',leave_type='" +
    leave_type +
    "',date_from='" +
    from +
    "',date_to='" +
    to +
    "',reason='" +
    reason +
    "' where id=" +
    id;
  con.query(query, callback);
};
