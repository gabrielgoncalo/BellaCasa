// Controllers/Appointment
const Appointment = require('../Models/Appointment');

// Criar novo compromisso
exports.createAppointment = async (req, res) => {
    const { name, category, price, stock, description } = req.body;

    try {
        const appointment = new Appointment({ name, category, price, stock, description});
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Obter todos os compromissos
exports.getAppointments = async (req, res) => {
    try{
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err){
        res.status(400).json({ message: err.message });
    }
};


// Obter os compromissos por (nome)
exports.getAppointmentByName = async (req, res) => {
    try {
        const nameQuery = req.query.name;
        if(!nameQuery) {
            return res.status(400).json({ message: "Nome nao fornecido"});
        }

        // Buscar compromissos que contenham ao nome (case-insensitive)
        const appointments = await Appointment.find({
            name: { $regex: new RegExp(nameQuery, "i") }
        });

        if (appointments.length === 0) {
            return res.status(404).json({ message: "Nenhum compromisso encontrado" });
        }

        res.json(appointments);

    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar compromisso por nome" })
    }
};





// Obter compromisso por ID
exports.getAppointmentsById = async (req, res) => {
    try{
        const appointment = await Appointment.findById(req.params.id);
        if(!appointment) return res.status(404).json({ message: 'compromisso não encontrado' });
        res.json(appointment)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Atualiza compromisso
exports.updateAppointment = async (req, res) => {
    try{
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!appointment) return res.status(404).json({ message: 'compromisso não encontrado' });
        res.json(appointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Deleta compromisso
exports.deleteAppointment = async (req, res) => {
    try{
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if(!appointment) res.status(404).json({ message: 'compromisso não encontrado' });
    return res.status(200).json({ message: 'compromisso deletado com sucesso' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};