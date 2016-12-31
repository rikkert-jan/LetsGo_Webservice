var mongoose = require("mongoose");
//var appRootPath = require("app-root-path");
//var encryption = require(appRootPath + "/mongoose-encryption");

console.log("Initializing user model.");

var userSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        phoneNumber:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        meetups: {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Meetup",
            }],
            required: false
        }
    });

//encryption.enableEncryption(noteSchema, ["name", "phoneNumber"]);

module.exports = mongoose.model("User", userSchema);