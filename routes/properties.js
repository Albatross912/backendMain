const express = require('express');
const Property = require('../models/Property');
const auth = require('../middleware/auth');
const router = express.Router();

// Post a Property
router.post('/', auth, async (req, res) => {
    const { place, area, bedrooms, bathrooms, nearby } = req.body;
    try {
        const newProperty = new Property({ place, area, bedrooms, bathrooms, nearby, seller: req.user.id });
        const property = await newProperty.save();
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get All Properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find().populate('seller', ['firstName', 'lastName', 'email', 'phone']);
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get Properties by Seller
router.get('/my-properties', auth, async (req, res) => {
    try {
        const properties = await Property.find({ seller: req.user.id });
        res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update Property
router.put('/:id', auth, async (req, res) => {
    const { place, area, bedrooms, bathrooms, nearby } = req.body;
    try {
        let property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        if (property.seller.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

        property = await Property.findByIdAndUpdate(req.params.id, { $set: { place, area, bedrooms, bathrooms, nearby } }, { new: true });
        res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete Property
router.delete('/:id', auth, async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ msg: 'Property not found' });

        if (property.seller.toString() !== req.user.id) return res.status(401).json({ msg: 'User not authorized' });

        await Property.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Property removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
