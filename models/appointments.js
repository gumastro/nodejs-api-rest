const moment = require('moment')

const connection = require('../infrastructure/connection')

class Appointment {
    add(appointment) {
        const created = new moment().format('YYYY-MM-DD HH:mm:ss')
        const appointmentDate = moment(appointment.appointmentDate, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
        const bookedAppointment = {...appointment, created, appointmentDate}

        const sql = 'INSERT INTO Appointments SET ?'

        connection.query(sql, bookedAppointment, (error, results) => {
            if(error) {
                console.log(error)
            } else {
                console.log(results)
            }
        })
    }
}

module.exports = new Appointment