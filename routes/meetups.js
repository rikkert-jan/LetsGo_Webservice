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

var getMeetupByUser = function(req, res, next) {
    var user = req.params.user;

    Meetup.findOne({ "invited.user.phoneNumber": user, due: false }).populate('invited').exec(function(err, meetupData) {
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
        //,created_by: req.body.admin
    });

    meetup.save(function(err) {
        if (err)
            return next(err);

        console.log('succesfully saved meetup to database');
        res.json(meetup);
    });
};

var addUserToMeetup = function(req, res, next) {
    var id = req.params.id;
    var phoneNumber = req.body.invitedNumber;

    User.findOne({ phoneNumber: phoneNumber }).exec(function(err, userData) {
        if (err)
            return next(err);

        if (userData) {
            console.log(userData);
            var userToAdd = {
                user: userData,
                accepted: null
            }
            Meetup.findOneAndUpdate({ _id: id }, { $push: { invited: userToAdd } }).exec(function(err, meetupData) {
                if (err)
                    return next(err);

                res.json(meetupData);
            });
        }
    });
}

var updateUserStatus = function(req, res, next) {
    /*TODO:
        Find user and update the accepted field in the meetup
    */
}
/* /FUNCTIONS */

/* ROUTES */
//router.route('/').get(getMeetups);
router.route('/:user').get(getMeetupByUser);
router.route('/').post(createMeetup);
router.route('/:id/users').put(addUserToMeetup);
router.route('/:id/users/:phoneNumber').put(updateUserStatus);
/* /ROUTES */

// Export
module.exports = function(mongoose, errCallback) {
    console.log('Initializing meetups routing module');
    Meetup = mongoose.model('Meetup');
    User = mongoose.model('User');
    handleError = errCallback;
    return router;
};
