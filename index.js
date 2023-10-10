const mysql = require('mysql2')
const express = require('express');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const path = require('path');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');

//Inseri aparencia, imagens comando dos butões em js
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/imagens', express.static('imagens'));
app.use('/node_modules/bootstrap/dist/css/', express.static('./node_modules/bootstrap/dist/css/'));
app.use('/node_modules/bootstrap/dist/js/', express.static('/node_modules/bootstrap/dist/js/'));
app.use('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/', express.static('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//conectar ao banco de dados para logar no sistema
const connection = mysql.createConnection({
    host: "192.168.1.66",
    user: "diogoporto",
    password: "d@172709",
    database: "MEDIMAGEM"
});
connection.connect(function(error){
    if (error) throw error;
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

// Cadastrar registro da tabela  do banco de dados Mysql
app.post('/cadastrar', (req, res) => {
  const cadastro = req.body;
  const {nome, cpf, rg, data_nascimento, sexo, peso, altura, telefone, celular, email, endereco, numero, complemento, bairro, cidade, estado, cep, tipo_exame, nome_exame, data_exame, data_entrega, convenio, medico, comentario } = cadastro;

//Cadastro de tabela relacionada Pacientes e Exames no Mysql - inicio do código
// Verificar se o nome já existe na pacientes
const checkQuery = `SELECT nome FROM pacientes WHERE nome = ?`;
const checkValues = [nome];


connection.query(checkQuery, checkValues, (err, results) => {
  if (err) {
    console.error('Erro ao verificar nome na pacientes:', err);
    res.status(500).send('Erro ao cadastrar');
    return;
  }

  // Se o nome já existir, enviar resposta JSON com mensagem de erro
  if (results.length > 0) {
    return res.json({ error: 'O nome já está cadastrado. Por favor, use um nome diferente.' });
  }
  
  // Query para inserir os dados na primeira tabela
  const query1 = `INSERT INTO pacientes (nome, cpf, rg, data_nascimento, sexo, peso, altura, telefone, celular, email, endereco, numero, complemento, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values1 = [nome, cpf, rg, data_nascimento, sexo, peso, altura, telefone, celular, email, endereco, numero, complemento, bairro, cidade, estado, cep];

  // Query para inserir os dados na segunda tabela usando o ID inserido na primeira tabela
  const query2 = `INSERT INTO exames (paciente_id, tipo_exame, nome_exame, data_exame, data_entrega, convenio, medico, comentario ) VALUES (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?, ? )`;
  const values2 = [tipo_exame, nome_exame, data_exame, data_entrega, convenio, medico, comentario ];

  // Executando as queries sequencialmente
  connection.query(query1, values1,(err, result1) => {
    if (err) {
      console.error('Erro ao inserir na tabela Paciente:', err);
      console.log('Erro ao cadastrar na Tabela Pacientes');
      
      return;
    }
    
    connection.query(query2, values2,(err, result2) => {
      if (err) {
        console.error('Erro ao inserir na tabela Exame:', err);
        res.status(500).send('Erro ao cadastrar 2');
        return;
      }

      console.log('Dados cadastrados com sucesso!');
      // Redirecionar para a página de sucesso após o cadastro ser concluído com êxito
      res.render("ficha")
    });
  });
});
});
//Cadastro de tabela relacionada Pacientes e exames no Mysql - fim do código


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


// Rota para apagar um registro por ID
app.delete('/api/pacientes/:id', (req, res) => {
  const pacienteId = req.params.id;

   // Verificar se o paciente com o ID existe
   const sql = 'SELECT * FROM pacientes WHERE id_paciente = ?';

   connection.query(sql, [pacienteId], (err, results) => {
    if (err) {
      console.error('Erro ao verificar o paciente:', err);
      return res.status(500).json({ error: 'Erro ao verificar o paciente' });
    }

    if (results.length === 0) {
      // Paciente não encontrado, retornar um status 404
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    // O paciente foi encontrado, podemos continuar com a exclusão dos exames
    const deleteExamesSQL = 'DELETE FROM exames WHERE paciente_id = ?';
    connection.query(deleteExamesSQL, [pacienteId], (deleteExamesError, deleteExamesResults) => {
      if (deleteExamesError) {
        console.error('Erro ao apagar os exames:', deleteExamesError);
        return res.status(500).json({ error: 'Erro ao apagar os exames' });
      }

    // Consulta SQL para excluir o paciente
    const deletePacienteSQL = 'DELETE FROM pacientes WHERE id_paciente = ?';

      connection.query(deletePacienteSQL, [pacienteId], (deletePacienteError, deletePacienteResults) => {
        if (deletePacienteError) {
          console.error('Erro ao apagar o paciente:', deletePacienteError);
          connection.rollback(() => {
            console.error('Transação revertida devido a erro ao apagar o paciente.');
            res.status(500).json({ error: 'Erro ao apagar o paciente' });
          });
          return;
        }

        connection.commit((commitError) => {
          if (commitError) {
            console.error('Erro ao confirmar a transação:', commitError);
            connection.rollback(() => {
              console.error('Transação revertida devido a erro ao confirmar.');
              res.status(500).json({ error: 'Erro ao confirmar a transação' });
            });
            return;
          }

          console.log('Paciente e exames apagados com sucesso.');
          res.status(200).json({ message: 'Paciente e exames apagados com sucesso' });
        });
      });
    });
  });
});



// carregar a pagina


app.get ("/teste.html", function(req, res) {
    res.sendFile(__dirname + "/teste.html");
});

app.get('/ficha', (req, res) =>{
    res.render("ficha")
})

app.get ("/index.html", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

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