const express = require('express');
const allUsers = require("./users");
const userById = require("./userById");
const createUser = require("./createUser");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");
const dropdowns = require('./dropdowns');
const getdomain = require('./getdomains');

const router = express.Router();

router.use('/users',allUsers);
router.use('/users', userById);
router.use('/users', createUser);
router.use('/users',updateUser);
router.use('/users',deleteUser);
router.use('/gender',dropdowns);
router.use('/domains', getdomain);

module.exports = router;