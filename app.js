const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

//Database
const connection = mysql.createConnection({
    host:'',// type your db host here.
    user:'',// type your db user here.
    password:'',// type your db password here.
    database:''//type your database name here.
});

connection.connect();

//Middleware
app.use(bodyParser.urlencoded({
    extended:false
}));

//Server
const PORT = 8000;

app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
});

//Routes movies
app.get('/movies',(req,res)=>{
    connection.query(('SELECT * FROM Movies'),(err,result,fields)=>{
        if (err) throw err;
        res.json(result);
    });
});
app.get('/movies/:id',(req,res)=>{
    connection.query((`SELECT * FROM Movies WHERE MovieID = ${req.params.id}`),(err,result,fields)=>{
        if (err) throw err;
        res.json(result);
    });
});
app.post('/movies',(req,res)=>{
    connection.query((`INSERT INTO Movies (Title,Yearr)
    VALUES ('${req.body.movieName}','${req.body.movieYear}');`),(err,result,fields)=>{
        if (err) throw err;
        res.json(result);
    });
});
app.put('/movies/:id',(req,res)=>{
    connection.query((`UPDATE Movies SET Title='${req.body.movieName}',Yearr='${req.body.movieYear}' WHERE MovieID=${req.params.id}`),(err,result,fields)=>{
        if (err) throw err;
        res.json(result);
    });
});
app.delete('/movies/:id',(req,res)=>{
    connection.query((`DELETE FROM Movies WHERE MovieID=${req.params.id}`),(err,result,fields)=>{
        if (err) throw err;
        res.json(result);
    });
});
