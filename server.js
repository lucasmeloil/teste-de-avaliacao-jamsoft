const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mssql = require('mssql');

const app = express();

// Configurar o middleware
app.use(bodyParser.json());
app.use(cors());

// Configurar a conexão com o banco de dados
const config = {
  user: 'seu_usuario',
  password: 'sua_senha',
  server: 'seu_servidor',
  database: 'seu_banco_de_dados',
};

// Rota para obter todas as tarefas
app.get('/api/tasks', (req, res) => {
  mssql.connect(config, (err) => {
    if (err) {
      console.log(err);
    } else {
      const request = new mssql.Request();
      request.query('SELECT * FROM tasks', (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json(result.recordset);
        }
        mssql.close();
      });
    }
  });
});

// Rota para adicionar uma nova tarefa
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;

  mssql.connect(config, (err) => {
    if (err) {
      console.log(err);
    } else {
      const request = new mssql.Request();
      request.query(`INSERT INTO tasks (title, description) VALUES ('${title}', '${description}')`, (err) => {
        if (err) {
          console.log(err);
        } else {
          res.sendStatus(201);
        }
        mssql.close();
      });
    }
  });
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor backend iniciado na porta ${port}`);
});
