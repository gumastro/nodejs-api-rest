module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Servidor rodando, tudo ok! Rota atendimentos e realizando um GET'))
}