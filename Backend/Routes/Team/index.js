const express = require('express');
const createTeam  = require("./creaateTeam");
const TeamByname = require("./TeamByname");
const Teams = require("./teams");

const router = express.Router();

router.use('/team',createTeam);
router.use('/team', TeamByname);
router.use('/teams', Teams);


module.exports = router;