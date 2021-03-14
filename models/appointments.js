const axios = require('axios')
const moment = require('moment')

const connection = require('../infrastructure/database/connection')
const repository = require('../repositories/appointment')

class Appointment {
    constructor() {
        this.isDateValid = ({appointmentDate, created}) => moment(appointmentDate).isSameOrAfter(created)
        this.isClientValid = (size) => size >= 3

        this.validate = (parameters) => {
            this.validations.filter(field => {
                const parameter = parameters[field.name]

                return !field.valid(parameter)
            })
        }

        this.validations = [
            {
                name: 'date',
                valid: this.isDateValid,
                message: 'Appointment date must be after or equal to current date'
            },
            {
                name: 'client',
                valid: this.isClientValid,
                message: 'Client name must be longer than 2 characters'
            }
        ]
    }

    add(appointment) {
        const created = new moment().format('YYYY-MM-DD HH:mm:ss')
        const appointmentDate = moment(appointment.appointmentDate, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')

        const parameters = {
            date: { appointmentDate, created },
            client: { size: appointment.client.length }
        }

        const errors = this.validate(parameters)

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