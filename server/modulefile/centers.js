const express = require("express");
const bodyParser = require('body-parser');
const eventrouter = express.Router();

let centers = [
    {
        id: 0,
        name: 'Adenike',
        location: 'ikeja',
        capacity: 20000,
    },

];

// get all centers
eventrouter.get('/', (req, resp) => resp.json({ centers: centers }))

    // get a single center
.get('/:centerid', (req, resp) => {
        // Search for a center with an id
        centers.forEach((val) => {
            // console.log(req.params.centerid, val.id);
            if (val.id === parseInt(req.params.centerid, 10)) {
                return resp.json({
                    val
                });
            }
        });

        return resp.json({
            messsage: 'Center not found',
            Error: true
        });

    })

    // Create a new center
    .post('/', (req, resp) => {
        // check if the validity of the input
        if (!req.body.name || !req.body.location || !req.body.capacity) {
            return resp.json({
                message: 'Please supply Event Center name, location and capacity',
                Error: true
            })
        }

        // creating a new center
        const newCenter = {
            id: centers.length,
            name: req.body.name,
            location: req.body.location,
            capacity: req.body.capacity
        }

        centers.push(newCenter);
        resp.json({
            message: 'Success',
            Error: false
        })
    })
    // MOdify the details of a center
    .put('/:centerid', (req, resp) => {
        // check if the validity of the input
        if (!req.body.name || !req.body.location || !req.body.capacity) {
            return resp.json({
                message: 'Please supply name, location and capacity of the event center',
                Error: true
            })
        }
        // Update a particular center id
        centers.forEach((val) => {
            if (val.id === parseInt(req.params.centerid, 10)) {
                centers[req.params.centerid].name = req.body.name;
                centers[req.params.centerid].location = req.body.location;
                centers[req.params.centerid].capacity = req.body.capacity;

                return resp.json({
                    Message: `Center ${val.id} updated`,
                    error: false,
                    user: centers

                })
            }
        })

        return resp.status(404).json({
            status: 'Center not found',
            error: true
        })
    })

    // Test if an id is supplied
    .delete('/', (req, resp) => resp.json({
        Message: 'Id not supplied',
        Error: true
    }))

    // Deleting a center
    .delete('/:centerid', (req, resp) => {

        centers.forEach((val) => {
            if (val.id === parseInt(req.params.centerid, 10)) {
                centers.splice(val.id, 1);

                //Updating the id in the database
                let count = 0;
                centers.forEach((val) => {
                    centers[count].id = count;
                    count++;
                })

                return resp.json({
                    Message: `Center deleted`,
                    Error: false
                })
            }
        });

        return resp.json({
            Message: 'center id not found',
            Error: true
        })
    })

    

module.exports = eventrouter;