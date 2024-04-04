const Area = require('../models/Area');

// Create new Area
exports.createArea = async (req, res) => {
  try {
    const { areaName, streetScope } = req.body;
    
    // Check if the areaName already exists
    const existingArea = await Area.findOne({ areaName });
    if (existingArea) {
      return res.status(400).json({ message: 'Area with this name already exists' });
    }
    
    const newArea = new Area({ areaName, streetScope });
    await newArea.save();
    res.status(201).json(newArea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read all Areas
exports.getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    if (!areas || areas.length === 0) {
      return res.status(404).json({ message: 'No areas found' });
    }
    res.json(areas);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Area by ID
exports.updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    const { areaName, streetScope } = req.body;

    // Check if the areaName already exists, excluding the current area being updated
    const existingArea = await Area.findOne({ areaName, _id: { $ne: id } });
    if (existingArea) {
      return res.status(400).json({ message: 'Another area with this name already exists' });
    }

    const updatedArea = await Area.findByIdAndUpdate(id, { areaName, streetScope }, { new: true });
    if (!updatedArea) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.json(updatedArea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete Area by ID
exports.deleteArea = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArea = await Area.findByIdAndDelete(id);
    if (!deletedArea) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.json({ message: 'Area deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
