const express = require('express');
const Team = require('../../model/Team');
const router = express.Router();


router.get('/:teamname', async (req, res) => {
    const teamNamedata = req.params.teamname;
    try {
        const team = await Team.findOne({ teamName: teamNamedata });
        if (!team) {
            return res.status(404).json({  data: [],
                message: 'Team Not found' });
        }
        res.status(201).json({
            data: team,
            message: 'Team found'
        });
    } catch (error) {
        console.error('Error retrieving team:', error); // Log any errors that occur
        res.status(500).json({ message: 'Error retrieving team' });
    }
});


 module.exports = router;