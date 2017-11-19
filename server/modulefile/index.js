const express = require('express');
const bodyParser = require('body-parser');
const newrouter = express.Router();

newrouter.use('/api/v1/users/events',require('./eventsroute'));
newrouter.use('/api/v1/admin/centers', require('./centers'));
module.exports = newrouter;