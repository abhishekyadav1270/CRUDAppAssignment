'user strict';
var dbConn = require('./../../config/db.config');


//Employee object create
var Employee = function(employee){
    this.id=employee.id;
    this.employee_name=employee.employee_name;
    this.employee_salary=employee.employee_salary;
    this.employee_age=employee.employee_age;
    this.profile_image=employee.profile_image;
};
Employee.create = function (newEmp, result) {    
    dbConn.query("INSERT INTO employees set ?", newEmp, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};
Employee.findById = function (id, result) {
    dbConn.query("Select * from employees where id = ? ", id, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });   
};
Employee.findAll = function (req,result) {
    console.log(JSON.stringify(result));
    var skip=req.body.skip;
    var limit=req.body.limit;
    dbConn.query(`Select * from employees LIMIT ${skip},${limit}`, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('employees : ', res);  
            result(null, res);
        }
    });   
};
Employee.update = function(id, employee, result){
  dbConn.query("UPDATE employees SET employee_name=?,employee_salary=?,employee_age=?,profile_image=? WHERE id = ?", [employee.employee_name,employee.employee_salary,employee.employee_age,employee.profile_image, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{   
            result(null, res);
        }
    }); 
};
Employee.delete = function(id, result){
     dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    }); 
};

module.exports= Employee;