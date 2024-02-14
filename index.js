// JavaScript source code
console.log("Start...");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var now = new Date();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/app'));

var pool = mysql.createConnection({
    host: "localhost",
    user: "gopika",
    password:"master",
    database: "marketingschema"
});

pool.connect(function (err) {
    if (err) {
        console.log(info() + " " + err);
    }
    else {
        console.log(info() + " connected...");
    }
});

function info() {
    now = new Date();
    return now.getTime();
}

app.set('port', (process.env.PORT || 8080));
app.get('/', function (req, res) {
    console.log(info() + " page request.... ");
    res.sendFile(__dirname + '/' + 'app/view/index.html');
});

app.get('/columnNames', function (req, res) {
    console.log(info() + " clientes request.... ");
    var sql = "show columns from marketingdb";
    pool.query(sql, function (err, result, fields) {
        if (err) {
            console.log(info() + " " + err);
            res.send(info() + ": dbErr...");
        }
        else { 
            console.log(info() + " " + result);
            res.send(result);
        }
    });
});

app.post('/columnDetails', function (req, res) {
    console.log(info() + " clientes request.... ");
    var sql = "select * from marketingdb where " + req.body.columnName + " = '" +req.body.value+ "'"
    console.log(sql)
    pool.query(sql,[req.body.value], function (err, result, fields) {
        if (err) {
            console.log(info() + " " + err);
            res.send(info() + ": dbErr...");
        }
        else {
            console.log(info() + " " + result);
            res.send(result);
        }
    });
});

app.get('/clientes', function (req, res) {
    console.log(info() + " clientes request.... ");
    var sql = "SELECT * FROM marketingdatabse";
    conexao.query(sql, function (err, result, fields) {
        if (err) {
            console.log(info() + " " + err);
            res.send(info() + ": dbErr...");
        }
        else {
            console.log(info() + " " + result);
            res.send(result);
        }
    });
});

/*app.post('/clientPost', function (req, res) {
    var data = req.body;
    var dnome = data.nome;
    var dmorada = data.morada;
    var sql = "INSERT INTO CLIENTES2 (nome,morada) VALUES(?, ?)";
    conexao.query(sql, [dnome, dmorada], function (err, result) {
        if (err) {
            console.log(info() + ":02 " + err);
            res.send(info() + ": dbErr02...");
        }
        else {
            console.log(info() + " " + result);
            res.send(result);
        }
    });
});*/

var dport = app.get('port');
app.listen(dport, function () {
    console.log(info() + " " + " app is running at http://localhost:" + dport + "/");
    console.log("   Hit CRTL-C to stop the node server.  ");
});
//
//