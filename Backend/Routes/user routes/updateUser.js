const express = require('express');
const router = express.Router();
const UserHeliverse = require('../../model/user');

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { FirstName, LastName, Email, Gender, Avatar, Domain, Available } = req.body;
    
    try {
        const updatedUser = await UserHeliverse.findOneAndUpdate(
            { id: userId }, 
            {
                first_name: FirstName,
                last_name: LastName,
                email: Email,
                gender: Gender,
                avatar: Avatar,
                domain: Domain,
                available: Available
            },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({
                data: null,
                error: "User not found",
                message: "User does not exist or ID is invalid"
            });
        }

        res.status(200).json({
            data: updatedUser,
            err: null,
            message: "User Updated"
        });

    } catch (error) {
        res.status(500).json({
            data: [],
            error: error.message,
            message: "Can't update user"
        });
    }
});

module.exports = router;
