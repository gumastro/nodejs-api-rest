const axios = require('axios')
const moment = require('moment')

const connection = require('../infrastructure/database/connection')
const repository = require('../repositories/appointment')

class Appointment {
    add(appointment) {
        const created = new moment().format('YYYY-MM-DD HH:mm:ss')
        const appointmentDate = moment(appointment.appointmentDate, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const isDateValid = moment(appointmentDate).isSameOrAfter(created)
        const isClientValid = appointment.client.length >= 3

        const validations = [
            {
                name: 'date',
                valid: isDateValid,
                message: 'Appointment date must be after or equal to current date'
            },
            {
                name: 'client',
                valid: isClientValid,
                message: 'Client name must be longer than 2 characters'
            }
        ]

        const errors = validations.filter(field => !field.valid)

        if (errors.length) {
            return new Promise((resolve, reject) => reject(errors))
        } else {
            
            const bookedAppointment = {...appointment, created, appointmentDate}

            return repository.add(bookedAppointment)
                .then((results) => {
                    const id = results.insertId
                    return ({ ...appointment, id })
                })
        }
    }

    list(res) {
        const sql = 'SELECT * FROM Appointments'

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results)
            }
        })
    }

    searchForId(id, res) {
        const sql = `SELECT * FROM Appointments WHERE id=${id}`

        connection.query(sql, async (error, results) => {
            const appointment = results[0]
            const cpf = appointment.client

            if(error) {
                res.status(400).json(error)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)

                appointment.client = data

                res.status(200).json(appointment)
            }
        })
    }

    modify(id, values, res) {
        if(values.appointmentDate) {
            values.appointmentDate = moment(values.appointmentDate, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'UPDATE Appointments SET ? WHERE id=?'

        connection.query(sql, [values, id], (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({...values, id})
            }
        })
    }

    delete(id, res) {
        const sql = 'DELETE FROM Appointments WHERE id=?'

        connection.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Appointment