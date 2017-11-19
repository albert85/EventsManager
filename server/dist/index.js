'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var newrouter = express.Router();

newrouter.use('/api/v1/users/events', require('./eventsroute'));
newrouter.use('/api/v1/admin/centers', require('./centers'));
module.exports = newrouter;