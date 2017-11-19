'use strict';

var express = require("express");
var bodyParser = require('body-parser');
var eventrouter = express.Router();

var events = [{
    id: 0,
    name: 'wedding',
    location: 'ikeja',
    startTime: '1.00AM',
    endTime: '2.00AM'
}, {
    id: 1,
    name: "burial",
    location: "ikeja",
    startTime: "1.00AM",
    endTime: "2.00AM"
}, {
    id: 2,
    name: "Wedding",
    location: "Ikorodu",
    startTime: "5.00AM",
    endTime: "6.00AM"
}, {
    id: 3,
    name: "Wedding",
    location: "Ikorodu",
    startTime: "5.00AM",
    endTime: "6.00AM"
}];

// get all events
eventrouter.get('/', function (req, resp) {
    return resp.json({ users: events });
})

// Create a new event
.post('/', function (req, resp) {
    // check if the validity of the input
    if (!req.body.name || !req.body.location || !req.body.startTime || !req.body.endTime) {
        return resp.json({
            message: 'Please supply name, location startTime and endTime of the event',
            Error: true
        });
    }

    // creating a new event
    var newEvent = {
        id: events.length,
        name: req.body.name,
        location: req.body.location,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    };
    events.push(newEvent);
    resp.json({
        message: 'New event was created',
        Error: false
    });
})
// edit an event
.put('/:eventid', function (req, resp) {
    // check if the validity of the input
    if (!req.body.name || !req.body.location || !req.body.startTime || !req.body.endTime) {
        return resp.json({
            message: 'Please supply name, location startTime and endTime of the event',
            Error: true
        });
    }
    // Update the event using event id
    events.forEach(function (val) {
        // console.log(val.id, req.params.id);
        if (val.id === parseInt(req.params.eventid, 10)) {
            events[req.params.eventid].name = req.body.name;
            events[req.params.eventid].location = req.body.location;
            events[req.params.eventid].startTime = req.body.startTime;
            events[req.params.eventid].endTime = req.body.endTime;

            return resp.json({
                Message: 'User ' + val.id + ' updated',
                error: false,
                user: events

            });
        }
    });

    return resp.status(404).json({
        status: 'User not found',
        error: true
    });
})

// Test if an id is supplied
.delete('/', function (req, resp) {
    return resp.json({
        Message: 'Id not supplied',
        Error: true });
})

// Deleting an event
.delete('/:eventid', function (req, resp) {

    events.forEach(function (val) {
        if (val.id === parseInt(req.params.eventid, 10)) {
            events.splice(val.id, 1);

            //Updating the id in the database
            var count = 0;
            events.forEach(function (val) {
                events[count].id = count;
                count++;
            });

            return resp.json({
                Message: 'User deleted',
                Error: false
            });
        }
    });

    return resp.json({
        Message: 'User id not found',
        Error: true
    });
});

module.exports = eventrouter;