const query = require('../infrastructure/database/queries')

class Appointment {
    add(appointment) {
        const sql = 'INSERT INTO Appointments SET ?'
        return query(sql, appointment)
    }
}

module.exports = new Appointment()