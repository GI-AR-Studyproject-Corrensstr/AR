const express = require('express')
const fs = require('fs')
const https = require('https')

const app = express()

const PORT = 4200

app.use('/three-module', express.static(__dirname + '/node_modules/three/build/three.module.js'))
app.use('/aframe', express.static(__dirname + '/node_modules/aframe/dist/'))
app.use('/aframe', express.static(__dirname + '/node_modules/aframe/dist/'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'))
app.use('/popperjs', express.static(__dirname + '/node_modules/@popperjs/core/dist/umd/'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'))
app.use('/gltf', express.static(__dirname + '/public/gltf'))
app.use('/pattern', express.static(__dirname + '/public/pattern'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/img', express.static(__dirname + '/public/img'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/html/index.html')
})

app.get('/ar', function (req, res) {
    res.sendFile(__dirname + '/public/html/ar.html')
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(4200, function () {
        console.log('Example app listening on port 4200! Go to https://localhost:4200/')
    })