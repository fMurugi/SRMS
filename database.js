var mysql = require('mysql');
var con = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE
});
con.connect(function(err){
    if(err) throw err;
    console.log('Database is connected successfully!!')
});

module.exports=con;