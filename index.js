//======================================== 0 Data

var data = [];

//======================================== 1 SQLITE DATABASE
const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database("./Database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

sql = 'SELECT * FROM data';
db.all(sql, [], (err, rows) => {
  if (err) return console.error(err.message);

  rows.forEach((row) => {
    data.push({
        "Sangat": row.sangat,
        "Puas": row.puas,
        "Standar": row.standar,
        "Kurang": row.kurang,
        "Tidak": row.tidak
    })
  });
});

//======================================== 2 SERVER SETUP
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

//==================================== 3 SERVER FUNCTION

app.get("/", function(req, res) {
    res.render("home",{
        data: data
    })
});

//================================== Button Function
app.post("/Sangat", (req, res) => {
    
    sql = 'UPDATE data SET sangat = ?';
    db.run(sql, [data[0].Sangat], (err) => {
        if (!err){
            data[0].Sangat++
            res.redirect("/");
      };
    });
  
  });
  app.post("/Puas", (req, res) => {
      sql = 'UPDATE data SET puas = ?';
      db.run(sql, [data[0].Puas], (err) => {
        if (!err){
            data[0].Puas++;
            res.redirect("/");
        };
    });
  
  });
  app.post("/Standar", (req, res) => {
      
      sql = 'UPDATE data SET standar = ?';
      db.run(sql, [data[0].Standar], (err) => {
          if (!err){
          data[0].Standar++;
          res.redirect("/");
      };
    });
  
  });
  app.post("/kurang", (req, res) => {
      
      sql = 'UPDATE data SET kurang = ?';
      db.run(sql, [data[0].Kurang], (err) => {
          if (!err){
              data[0].Kurang++;
              res.redirect("/");
      };
    });
  
  });
  app.post("/Tidak", (req, res) => {
      
      sql = 'UPDATE data SET tidak = ?';
      db.run(sql, [data[0].Tidak], (err) => {
          if (!err){
            data[0].Tidak++;
            res.redirect("/");
        };
    });
  
  });
//=================================== 5 START SERVER!
app.listen(3000, (req, res) => {
	Host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
	console.log("App is running on port 3000")
})
