const express = require('express');
const router = express.Router();
const UserHeliverse = require('../../model/user');


router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const User = await UserHeliverse.findOne({id:userId});
        if (!User) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(User);
    } catch (error) {
        res.status(500).json({
             data:[],
             message: 'Error while finding user', 
             error: error.message });
    }
});

module.exports = router;

















module.exports = router;