const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reservations'
  });

  connection.connect((err)=> { 

    if(!err) 
    
    console.log('Connection Established Successfully'); 
    
    else 
    
    console.log('Connection Failed!'); 
    
    }); 