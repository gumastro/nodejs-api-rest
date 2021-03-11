const moment = require('moment')

const connection = require('../infrastructure/connection')

class Appointment {
    add(appointment, res) {
        const created = new moment().format('YYYY-MM-DD HH:mm:ss')
        const appointmentDate = moment(appointment.appointmentDate, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
        const bookedAppointment = {...appointment, created, appointmentDate}

        const sql = 'INSERT INTO Appointments SET ?'

        connection.query(sql, bookedAppointment, (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(201).json(results)
            }
        })
    }
}

module.exports = new Appointment