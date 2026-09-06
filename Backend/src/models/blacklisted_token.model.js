const mongoose = require('mongoose');

const blackListed_token_schema = new mongoose.Schema({

    token : {
        type: String,
        required : [true, "Token Required For Adding It to Blacklist"]
    }
},{
    timestamps : true
}
)

const blacklisted_model = mongoose.model('blacklisted_token', blackListed_token_schema);

module.exports = blacklisted_model;