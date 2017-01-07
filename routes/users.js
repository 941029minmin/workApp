var express = require('express');
var mysql=require("../comm/mysql");
var crypto=require("crypto");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render("admin/index")
});
router.get('/show', function(req, res, next) {

   mysql.query("select * from user",function(error,rows){
       console.log(rows);
       res.render("admin/show",{rows:rows})
   })

});
router.get('/add', function(req, res, next) {
    res.render("admin/add")
});
router.use('/addInfo', function(req, res, next) {
    var name=req.body.name;
    var pass=req.body.pass;
    var phone=req.body.phone;
    var email=req.body.email;
    var md5 = crypto.createHash('md5');
    md5.update(pass);
    pass=md5.digest('hex');
    mysql.query(`insert into user (name,pass,phone,email) values ('${name}','${pass}','${phone}','${email}')`,function(error){
        res.redirect("/admin/add")
    })

});
router.use('/updateInfo', function(req, res, next) {
    var name=req.body.name;
    var pass=req.body.pass?req.body.pass:"123456";
    var phone=req.body.phone;
    var email=req.body.email;
    var id=req.body.id;
    var md5 = crypto.createHash('md5');
    md5.update(pass);
    pass=md5.digest('hex');
    mysql.query(`update user set name='${name}',pass='${pass}',phone='${phone}',email='${email}' where id=${id}`,function(error){
        res.redirect("/admin/show")
    })

});



router.get('/login', function(req, res, next) {
    res.send("login");
});
router.get('/main', function(req, res, next) {
    res.render("admin/main")
});
router.get('/edit/:id', function(req, res, next) {
    var id=req.params.id;
    mysql.query("select * from user where id="+id,function(error,rows){
        res.render("admin/edit",{rows:rows[0]})
    })

});
router.get('/del/:id', function(req, res, next) {
    var id=req.params.id;
    mysql.query("delete from user where id="+id,function(){
        res.redirect("/admin/show")
    })

});


module.exports = router;
