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
    Meetup.find({_id: id}).populate('invited').exec(function(err, meetupData) {
        if (err)
            return next(err);

        res.json(meetupData);
    });
}

var createMeetup = function(req, res, next) {
    var meetup = new Meetup({
        title: req.params.title,
        location: req.params.location,
        dateTime: req.params.dateTime,
        description: req.params.description,
        invited: req.params.invited
    });

    meetup.save(function(err) {
        if (err)
            return next(err);

        console.log('succesfully saved meetup to database');
    });
};
/* /FUNCTIONS */

/* ROUTES */
router.route('/').get(getMeetups);
router.route('/:id').get(getMeetupById);
router.route('/').post(createMeetup);
/* /ROUTES */

// Export
module.exports = function(mongoose, errCallback) {
    console.log('Initializing meetups routing module');
    Meetup = mongoose.model('Meetup');
    User = mongoose.model('User');
    handleError = errCallback;
    return router;
};
