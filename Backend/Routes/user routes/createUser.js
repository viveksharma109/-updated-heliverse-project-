const express = require('express');
const UserHeliverse = require('../../model/user');
const router = express.Router();

router.post('/', async (req, res) => {
    const { Id, FirstName, LastName, Email, Gender, Avatar, Domain, Available } = req.body;
    try {
        const newUser = new UserHeliverse ({
            id: Id,
            first_name: FirstName,
            last_name: LastName,
            email: Email,
            gender: Gender,
            avatar: Avatar,
            domain: Domain,
            available: Available
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            data: savedUser,
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).json({
            data: [],
            error: error.message, 
            message: "Can't create user"
        });
    }
});

module.exports = router;




















module.exports = router;