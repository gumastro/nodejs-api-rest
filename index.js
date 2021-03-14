const customExpress = require('./config/customExpress')
const connection = require('./infrastructure/database/connection')
const tables = require('./infrastructure/database/tables')

connection.connect(error => {
    if (error) {
        console.log(error)
    } else {
        console.log("Connected to database!")

        tables.init(connection)
        const app = customExpress()

        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))

    }
})