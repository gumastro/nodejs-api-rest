const Appointment = require('../models/appointments')

module.exports = app => {
    app.get('/appointments', (req, res) => res.send('Server is running! Appointments and sending a GET'))

    app.post('/appointments', (req, res) => {
        const appointment = req.body

        Appointment.add(appointment, res)
    })
}