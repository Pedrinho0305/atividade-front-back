const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos',
    database: 'web_03mb'
})

// Rota para LER (Get)
app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtosPedro'
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

// Rota para CRIAR (Post)
app.post('/produtos', (req, res) => {
    const sql = 'INSERT INTO produtosPedro (nome, preco) VALUES (?)'
    const values = [
        req.body.nome,
        req.body.preco
    ]
    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json('Produto cadastrado')
    })
})

// NOVA ROTA: DELETAR (Delete)
app.delete('/produtos/:id', (req, res) => {
    const sql = 'DELETE FROM produtosPedro WHERE id = ?'
    const id = req.params.id // Pega o ID que vem na URL

    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json('Produto deletado com sucesso')
    })
})

app.listen(8081, () => {
    console.log('Servidor rodando')
})