const express = require('express');
const router = express.Router();
const UserHeliverse = require('../../model/user');

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await UserHeliverse.findOne( { id: userId});
        if (!user) {
            return res.status(404).json({
                data: null,
                error: "User not found",
                message: "Unable to delete the user"
            });
        }
        await UserHeliverse.findOneAndDelete( { id: userId});
        res.status(200).json({
            data: null,
            error: null,
            message: "User deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            data: null,
            error: err.message,
            message: "Unable to delete the user"
        });
    }
});

module.exports = router;
