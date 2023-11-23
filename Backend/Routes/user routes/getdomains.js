const express = require('express');
const router = express.Router();
const UserHeliverse = require('../../model/user');


router.get('/', async (req, res) => {
    try{ 
        console.log("check 1")
        let users = await UserHeliverse.find();
        const domains = [];
        users.map((user) =>{
            domains.includes(user.domain) ? null  :  domains.push(user.domain);
        } );
        res.status(200).json({
            data:domains,
            error:null,
            message:"all domains are found"
        })

    } catch(error){
        res.status(500).json({
            data: [],
            error: error.message,
            message: "Can't found"
        });
    }
})


module.exports = router;