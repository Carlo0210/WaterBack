const express = require('express');
const router = express.Router();
const areaController = require('../controllers/areaController');

// Create a new Area
router.post('/', areaController.createArea);

// Read all Areas
router.get('/', areaController.getAllAreas);

// Update an Area by ID
router.put('/:id', areaController.updateArea);

// Delete an Area by ID
router.delete('/:id', areaController.deleteArea);

module.exports = router;
