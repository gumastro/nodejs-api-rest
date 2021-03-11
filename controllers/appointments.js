const Appointment = require('../models/appointments')

module.exports = app => {
    app.get('/appointments', (req, res) => {
        Appointment.list(res)
    })

    app.get('/appointments/:id', (req, res) => {
        console.log(req.params)

        Appointment.searchForId(parseInt(req.params.id), res)
    })

    app.post('/appointments', (req, res) => {
        const appointment = req.body

        Appointment.add(appointment, res)
    })
}