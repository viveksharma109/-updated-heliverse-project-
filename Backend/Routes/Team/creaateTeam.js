const express = require('express');
const Team = require('../../model/Team');
const router = express.Router();

router.post('/', async (req, res) => {
    const { TeamName, MembersArray } = req.body;
    try {
        const team = new Team({
            teamName: TeamName,
            members: MembersArray
        });

        const TeamData = await team.save();
        res.status(201).json({
            data: TeamData,
            message: 'Team created successfully'
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({
            data: [],
            error: error.message,
            message: "Can't create Team"
        });
    }
});

module.exports = router;
