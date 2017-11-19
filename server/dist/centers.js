'use strict';

var express = require("express");
var bodyParser = require('body-parser');
var eventrouter = express.Router();

var centers = [{
    id: 0,
    name: 'Adenike',
    location: 'ikeja',
    capacity: 20000
}];

// get all centers
eventrouter.get('/', function (req, resp) {
    return resp.json({ centers: centers });
})

// get a single center
.get('/:centerid', function (req, resp) {
    // Search for a center with an id
    centers.forEach(function (val) {
        // console.log(req.params.centerid, val.id);
        if (val.id === parseInt(req.params.centerid, 10)) {
            return resp.json({
                val: val
            });
        }
    });

    return resp.json({
        messsage: 'Center not found',
        Error: true
    });
})

// Create a new center
.post('/', function (req, resp) {
    // check if the validity of the input
    if (!req.body.name || !req.body.location || !req.body.capacity) {
        return resp.json({
            message: 'Please supply Event Center name, location and capacity',
            Error: true
        });
    }

    // creating a new center
    var newCenter = {
        id: centers.length,
        name: req.body.name,
        location: req.body.location,
        capacity: req.body.capacity
    };

    centers.push(newCenter);
    resp.json({
        message: 'Success',
        Error: false
    });
})
// MOdify the details of a center
.put('/:centerid', function (req, resp) {
    // check if the validity of the input
    if (!req.body.name || !req.body.location || !req.body.capacity) {
        return resp.json({
            message: 'Please supply name, location and capacity of the event center',
            Error: true
        });
    }
    // Update a particular center id
    centers.forEach(function (val) {
        if (val.id === parseInt(req.params.centerid, 10)) {
            centers[req.params.centerid].name = req.body.name;
            centers[req.params.centerid].location = req.body.location;
            centers[req.params.centerid].capacity = req.body.capacity;

            return resp.json({
                Message: 'Center ' + val.id + ' updated',
                error: false,
                user: centers

            });
        }
    });

    return resp.status(404).json({
        status: 'Center not found',
        error: true
    });
})

// Test if an id is supplied
.delete('/', function (req, resp) {
    return resp.json({
        Message: 'Id not supplied',
        Error: true
    });
})

// Deleting a center
.delete('/:centerid', function (req, resp) {

    centers.forEach(function (val) {
        if (val.id === parseInt(req.params.centerid, 10)) {
            centers.splice(val.id, 1);

            //Updating the id in the database
            var count = 0;
            centers.forEach(function (val) {
                centers[count].id = count;
                count++;
            });

            return resp.json({
                Message: 'Center deleted',
                Error: false
            });
        }
    });

    return resp.json({
        Message: 'center id not found',
        Error: true
    });
});

module.exports = eventrouter;