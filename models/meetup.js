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
            //Default: Date.now,
            required: false
        },
        invited:
        {
            type: [{
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                accepted: {
                    type: Boolean,
                    required: false,
                    Default: null
                }
            }],
            required: false
        },
        created_by:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false // Must be true, but is false for testing purposes
        },
        created_at:
        {
            type: Date,
            default: Date.now,
            required: true
        },
        due:
        {
            type: Boolean,
            required: true,
            Default: false
        }
    });

//encryption.enableEncryption(noteSchema, ["title", "location", "description", "date", "time", "invited"]);

module.exports = mongoose.model("Meetup", meetupSchema);