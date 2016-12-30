var mongoose = require("mongoose");
//var appRootPath = require("app-root-path");
//var encryption = require(appRootPath + "/mongoose-encryption");

console.log("Initializing meetup model.");

var meetupSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: true
        },
        location:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: false
        },
        dateTime:
        {
            type: String,
            required: true
        },
        invited: 
        {
            type: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }],
            required: true
        },
        created_at:
        {
            type: Date,
            default: Date.now,
            required: true
        }
    });

//encryption.enableEncryption(noteSchema, ["title", "location", "description", "date", "time", "invited"]);

module.exports = mongoose.model("Meetup", meetupSchema);