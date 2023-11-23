const express = require('express');
const UserHeliverse = require('../../model/user');
const router = express.Router();

router.get('/', async (req, res) => { 
    try {
        const users = await UserHeliverse.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.json(users);
    } catch(error) {
        res.status(500).json({
            message: 'Error retrieving data',
            error: error.message 
        });
    }
});

module.exports = router;
