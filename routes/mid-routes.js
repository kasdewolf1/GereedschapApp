const express = require('express');
const app = express();

app.get('/mid-routes', (req, res, next) => 
    res.send('This is a mid-route')