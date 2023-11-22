const express = require('express');
const Team = require('../../model/Team');
const router = express.Router();

router.get('/', async (req, res) => { 
    try {
        const Teams = await Team.find();
        if (!Teams || Teams.length === 0) {
            return res.status(404).json({ message: 'No Team found' });
        }
        res.json(Teams);
    } catch(error) {
        res.status(500).json({
            message: 'Error retrieving data',
            error: error.message 
        });
    }
});

module.exports = router;
