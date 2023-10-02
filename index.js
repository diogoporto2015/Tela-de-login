const mysql = require('mysql2')
const express = require('express');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const path = require('path');
const ejs = require('ejs');
const moment = require('moment');
const { format } = require('date-fns');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

//Inseri aparencia, imagens comando dos butões em js
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/imagens', express.static('imagens'));
app.use('/fullcalendar-6.1.4/dist', express.static('fullcalendar-6.1.4/dist'));
app.use('/fullcalendar-6.1.4/packages/core/locales/', express.static('fullcalendar-6.1.4/packages/core/locales'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//conectar ao banco de dados para logar no sistema
const connection = mysql.createConnection({
    host: "192.168.1.66",
    user: "diogoporto",
    password: "d@172709",
    database: "cadastro"
});
connection.connect(function(error){
    if (error) throw error
    console.log("Conectado ao banco de dados com Sucesso!")
});

// Realizar o Login no banco de dados Mysql

app.post("/index.html", encoder, (req, res) => {
    var nome = req.body.nome;
    var senha = req.body.senha;

    connection.query("select * from usuarios where nome = ? and senha = ?", [nome, senha], (error, results, fields) => {
        if(results.length > 0){
            res.redirect("/ficha.html");
        }else {
            res.redirect("/index.html");
        }
        res.end();
    })
})


// Listar registro da tabela  do banco de dados Mysql
app.get('/', function(req, res) {
    const search = req.query.search;
  
    if (search) {
      const query = 'SELECT pacientes.*, exames.*, DATE_FORMAT(data_nascimento, "%d/%m/%Y") AS data_nascimento, DATE_FORMAT(data_exame, "%d/%m/%Y") AS data_exame,DATE_FORMAT(data_entrega, "%d/%m/%Y") AS data_entrega FROM exames inner join pacientes on exames.paciente_id = pacientes.id_paciente  WHERE nome = \'' + search + '\'';
  
      connection.query(query, function(err, rows, fields) {
        if (err) throw err;
        
        res.render('pesquisa', { records: rows, search: search });
      });

    } else {
      res.render('pesquisa', { search: search });
    }
  });


// carregar a pagina

app.get ("/index.html", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/ficha.html", function (req, res){
    res.sendFile(__dirname + "/ficha.html");
})

app.get ("/dessiomentria.html", function(req, res) {
    res.sendFile(__dirname + "/dessiomentria.html");
});

app.get ("/mamografia.html", function(req, res) {
    res.sendFile(__dirname + "/mamografia.html");
});

app.get ("/medicoOrtopedia.html", function(req, res) {
    res.sendFile(__dirname + "/medicoOrtopedia.html");
});

app.get ("/raoisx.html", function(req, res) {
    res.sendFile(__dirname + "/raoisx.html");
});

app.get ("/ultrassonografia.html", function(req, res) {
    res.sendFile(__dirname + "/ultrassonografia.html");
});







app.listen(8080);
console.log("Servidor Rodando e Funcionando! localhost:8080");