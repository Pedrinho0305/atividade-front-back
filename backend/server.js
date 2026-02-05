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

app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM produtosPedro'
    db.query(sql, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

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

app.listen(8081, () => {
    console.log('Servidor rodando')
})