const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    }
    , members: [
        {
            id: Number,
            fname: String,
            lname: String,
            gender: String,
            domain: String,
            available: Boolean,
            email: String,
            avatar: String
          }
    ],
});


module.exports = mongoose.model('Team', teamSchema);;