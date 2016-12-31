var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* FUNCTIONS */
var getMeetups = function(req, res, next) {
    Meetup.find().populate('invited').exec(function(err, meetupData) {
        if (err)
            return next(err);

        res.json(meetupData);
    });
};

var getMeetupById = function(req, res, next) {
    var id = req.params.id;
    Meetup.find({ _id: id }).populate('invited').exec(function(err, meetupData) {
        if (err)
            return next(err);

        res.json(meetupData);
    });
}

var createMeetup = function(req, res, next) {
    var meetup = new Meetup({
        title: req.body.title,
        location: req.body.location,
        dateTime: req.body.dateTime,
        description: req.body.description,
        invited: []
    });

    $.each(req.body.invitedNumbers, function(phoneNumberEntry) {
        User.findOne({ phoneNumber: phoneNumberEntry }).exec(function(err, userData) {
            if (err)
                console.log(err);
            meetup.invited.push({ user: userData });
        })
    });

    meetup.save(function(err) {
        if (err)
            return next(err);

        console.log('succesfully saved meetup to database');
        res.json(meetup);
    });
};

var updateUserStatus = function(req, res, next) {
    /*TODO:
        Find user and update the accepted field in the meetup
    */
}
/* /FUNCTIONS */

/* ROUTES */
router.route('/').get(getMeetups);
router.route('/:id').get(getMeetupById);
router.route('/').post(createMeetup);
router.route('/:id/users/:userId').put(updateUserStatus);
/* /ROUTES */

// Export
module.exports = function(mongoose, errCallback) {
    console.log('Initializing meetups routing module');
    Meetup = mongoose.model('Meetup');
    User = mongoose.model('User');
    handleError = errCallback;
    return router;
};
