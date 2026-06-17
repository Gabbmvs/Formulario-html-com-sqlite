const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// criar banco
const db = new sqlite3.Database("banco.db");

// criar tabela
db.run(`
CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    endereco TEXT,
    cidade TEXT,
    celular TEXT,
    email TEXT
)
`);

app.post("/salvar", (req, res) => {

    const { nome, endereco, cidade, celular, email } = req.body;

    db.run(
        `
        INSERT INTO clientes
        (nome, endereco, cidade, celular, email)
        VALUES (?, ?, ?, ?, ?)
        `,
        [nome, endereco, cidade, celular, email],
        function (erro) {

            if (erro) {
                console.log(erro);
                return res.redirect("/erro.html");
            }

            res.redirect("/sucesso.html");
        }
    );
});

app.listen(4000, () => {
    console.log("Servidor rodando em http://localhost:4000");
});