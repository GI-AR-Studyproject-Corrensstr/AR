const express = require('express')
var fs = require('fs')
var https = require('https')
const app = express()

const PORT = 3000

app.use('/aframe', express.static(__dirname + '/node_modules/aframe/dist/'))
app.use('/gltf', express.static(__dirname + '/public/gltf'))
app.use('/pattern', express.static(__dirname + '/public/pattern'))
app.use('/js', express.static(__dirname + '/public/js'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/html/index.html')
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(3000, function () {
        console.log('Example app listening on port 3000! Go to https://localhost:3000/')
    })