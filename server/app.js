var express = require('express');
var bodyParser = require('body-parser');
const newrouter =  express.Router();

const app = express();

// const router = app.router();


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

// app.use('/',(req, resp)=>resp.json({status: 'sucess'}));

app.use(require('./modulefile'));

app.listen(8080);