const express = require('express');
const router = express.Router();
const appointmentsController = require('../Controllers/AppointmentsController');


// Rotas para compromissos
router.post('/', appointmentsController.createAppointment);
router.get('/', appointmentsController.getAppointments);
router.get('/search', appointmentsController.getAppointmentByName);
//router.get('/:id', appointmentsController.getAppointmentsById);
//router.get('/:id', appointmentsController.updateAppointment);
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;