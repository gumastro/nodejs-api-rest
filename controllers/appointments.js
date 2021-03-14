const Appointment = require('../models/appointments')

module.exports = app => {
    app.get('/appointments', (req, res) => {
        Appointment.list()
            .then(results => res.status(200).json(results))
            .catch(error => res.status(400).json(error))
    })

    app.get('/appointments/:id', (req, res) => {
        console.log(req.params)

        Appointment.searchForId(parseInt(req.params.id), res)
    })

    app.post('/appointments', (req, res) => {
        const appointment = req.body

        Appointment.add(appointment)
            .then(registeredAppointment => {
                res.status(201).json(registeredAppointment)
            })
            .catch(error => {
                res.status(400).json(error)
            })
    })

    app.patch('/appointments/:id', (req, res) => {
        Appointment.modify(parseInt(req.params.id), req.body, res)
    })

    app.delete('/appointments/:id', (req, res) => {
        Appointment.delete(parseInt(req.params.id), res)
    })
}