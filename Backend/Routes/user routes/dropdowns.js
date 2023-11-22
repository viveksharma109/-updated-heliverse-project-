const express = require('express');
const router = express.Router();
const UserHeliverse = require('../../model/user');

router.get('/', async (req, res) => {
    const { gender, domain, available } = req.query; 
    console.log(gender);
    console.log(domain);
    console.log(available);
    try {
        let users = await UserHeliverse.find(); 
        if(gender){
            users=users.filter((user) =>{ 
                if(user.gender===gender){
                    return user;
                }
            })
        }
        if(domain){
            users=users.filter((user) =>{
                if(user.domain=== domain){
                    return user;
                }
            })
        }
        if(available){
            users=users.filter((user) =>{
                if(available.toLowerCase()==="yes"&&user.available){
                    return user;
                }
                if(available.toLowerCase()==="no"&&!user.available){
                    return user;
                }
            })
        }
        if (users.length === 0) {
            return res.status(404).json({
                data: [],
                message: "No users found for this gender"
            });
        }
        res.status(200).json({
            data: users,
            message: "Users fetched successfully"
        });
    }  catch (error) {
        res.status(500).json({
            message: 'Error retrieving users for the selected criteria',
            error
        });
    }
});

module.exports = router;

  