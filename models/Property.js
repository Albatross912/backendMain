const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    place: { type: String, required: true },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    nearby: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Property', PropertySchema);
