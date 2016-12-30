var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* FUNCTIONS */
var getUsers = function(req, res, next) {
    Users.find().exec(function(err, userData) {
        if (err)
            return next(err);

        res.jsonp(userData);
    });
};

var getUserById = function(req, res, next) {
    var id = req.params.id;
    User.find({ _id: id }).exec(function(err, userData) {
        if (err)
            return next(err);

        res.jsonp(userData);
    });
}

var createUser = function(req, res, next) {
    var user = new User({
        name: req.params.name,
        phoneNumber: req.params.phoneNumber,
        password: req.params.password,
    });

    user.save(function(err) {
        if (err)
            return next(err);

        console.log('succesfully saved user to database');
    });
};

var verificateUser = function(req, res, next) {
    var phoneNumber = req.params.phoneNumber;
    var password = req.params.password;

    User.findOne({ phoneNumber: phoneNumber }).exec(function(err, userData) {
        if (err)
            return next(err);
            
        if (userData.password == password){
            res.json(userData);
        }else{
            console.log("Login failed");
            res.json({
                message: "incorrect"
            });
        }
    });
};
/* /FUNCTIONS */

/* ROUTES */
router.route('/').get(getUsers);
router.route('/:id').get(getUserById);
router.route('/').post(createUser);
router.route('/:phoneNumber/verification/:password').get(verificateUser);
/* /ROUTES */

// Export
module.exports = function(mongoose, errCallback) {
    console.log('Initializing users routing module');
    User = mongoose.model('User');
    handleError = errCallback;
    return router;
};
