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

    app.patch('/appointments/:id', (req, res) => {
        Appointment.modify(parseInt(req.params.id), req.body, res)
    })

    app.delete('/appointments/:id', (req, res) => {
        Appointment.delete(parseInt(req.params.id), res)
    })
}