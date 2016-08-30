var express = require('express');
var app = express();
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var uuid = require('uuid');
var jsmediatags = require("jsmediatags");
var btoa = require('btoa');


app.use(express.static(path.join(__dirname, '')));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './user_data/songs/' + req.query.userId + '/');
    },
    filename: function (req, file, cb) {
        file.songId = uuid.v1();
        cb(null, file.songId + '.' + file.originalname.split('.')[1]);
    }
});
var upload = multer({ storage: storage }).single('file');
try {
    var server = app.listen(8080, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Server on http: ', host, port);
    });
} catch (error) {
    console.log(error);
}
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/upload', function (req, res, next) {
    var userFolder = 'user_data/songs/' + req.query.userId;
    var imageFolder = 'user_data/thumbs/' + req.query.userId;
    if (!fs.existsSync(userFolder)){
        fs.mkdirSync(userFolder);
    }
    if (!fs.existsSync(imageFolder)){
        fs.mkdirSync(imageFolder);
    }
    upload(req, res, function () {
        jsmediatags.read(req.file.destination + req.file.filename, {
            onSuccess: function(tags) {
                if(tags.tags.picture) {
                    var base64String = "";
                    for (var i = 0; i < tags.tags.picture.data.length; i++) {
                        base64String += String.fromCharCode(tags.tags.picture.data[i]);
                    }
                    var imageUrl = imageFolder + '/' +req.file.filename + '.' +tags.tags.picture.format.split('/')[1];
                    dataUrl = btoa(base64String);
                    require("fs").writeFile('./'+imageUrl , dataUrl, 'base64', function (err) {
                        tags.tags.thumbUrl = imageUrl;
                        tags.tags.songUrl = userFolder + '/' + req.file.filename;
                        tags.tags.songId = req.file.filename.split('.')[0];
                        tags.tags.originalName = req.file.originalname;
                        tags.tags.size = req.file.size;
                        res.json(tags);
                    });
                } else {
                    tags.tags.songUrl = userFolder + '/' + req.file.filename;
                    tags.tags.thumbUrl = '/default.jpg';
                    tags.tags.songId = req.file.filename.split('.')[0];
                    tags.tags.originalName = req.file.originalname;
                    tags.tags.size = req.file.size;
                    res.json(tags);
                }
            },
            onError: function (error) {
                res.json({message: error});
            }
        });
    })
});
