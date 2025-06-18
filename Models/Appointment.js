//models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },
    
    price: {
        type: Number,
        required: true,
    },

    stock: {
        type: Number,
        required: true,
    },

    description: String,
    
});

module.exports = mongoose.model('Appointment', appointmentSchema);