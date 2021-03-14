const connection = require('../infrastructure/connection')
const uploadFiles = require('../infrastructure/files/uploadFiles')

class Pet {
    add(pet, res) {
        const sql = 'INSERT INTO Pets SET ?'

        uploadFiles(pet.image, pet.name, (error, newImagePath) => {
            if (error) {
                res.status(400).json({error})
            } else {
                const newPet = {
                    name: pet.name,
                    image: newImagePath
                }

                connection.query(sql, newPet, (error) => {
                    if(error) {
                        res.status(400).json(error)
                    } else {
                        res.status(200).json(newPet)
                    }
                })
            }
        })
    }
}

module.exports = new Pet