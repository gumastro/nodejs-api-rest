const moment = require('moment')

const connection = require('../infrastructure/connection')

class Appointment {
    add(appointment, res) {
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
            res.status(400).json(errors)
        } else {
            
            const bookedAppointment = {...appointment, created, appointmentDate}

            const sql = 'INSERT INTO Appointments SET ?'

            connection.query(sql, bookedAppointment, (error, results) => {
                if(error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(appointment)
                }
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

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(results[0])
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