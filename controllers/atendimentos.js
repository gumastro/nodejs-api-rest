module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Servidor rodando, tudo ok! Rota atendimentos e realizando um GET'))

    app.post('/atendimentos', (req, res) => res.send('Rota de atendimentos e realizando um POST'))
}