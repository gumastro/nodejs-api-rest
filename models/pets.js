const connection = require('../infrastructure/connection')

class Pet {
    add(pet, res) {
        const sql = 'INSERT INTO Pets SET ?'
        connection.query(sql, pet, (error) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(pet)
            }
        })
    }
}

module.exports = new Pet