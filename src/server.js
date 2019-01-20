//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/'));

app.get('*', function(req, res) {
            // Replace the '/dist/<to_your_project_name>/index.html'
            res.sendFile(path.join(__dirname + '/dist/index.html'));