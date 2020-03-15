var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var path = require('path');
const bodyParser = require('body-parser')
var zip = require('express-zip');
const child_process = require('child_process');
var zipFolder = require('zip-folder');
var port = 4000;

app.use(cors())

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));
app.use('/videos',express.static(path.join(__dirname, 'public/Downloaded')));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var fs = require('fs');
      var dir = 'public/Downloaded/'+req.headers['username'];
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      var dir = 'public/Downloaded/'+req.headers['username']+'/images';
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      cb(null,dir)
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })

var upload = multer({ storage: storage }).array('file')


/*
app.post('/saveastextfile',function(req,res){
    var dir = 'public/uploaded/'+req.body.username+"/output";
    var fs = require('fs');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    fs.writeFile(dir+"/output_"+req.body.imagename+".txt",req.body.imagedata, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("File Saved");
    });

    return res.send(req.body.username)
})
*/

var folderpath = './public/Downloaded';

app.post('/downloadfiles', function(req, res) {
  var userfolderpath = folderpath+"/"+req.body.username
  zipFolder(userfolderpath, folderpath+'/'+req.body.username+'.zip', function(err) {
    if(err) {
        console.log('error: ', err);
    } else {
        console.log('Done');
    }
  });
  res.download(folderpath + '/'+req.body.username+'.zip');
});


app.post('/download',function(req,res){

  var username = req.body.username
  var videoname = req.body.videoname
  var videourl = req.body.videourl
  console.log(username);
  var dir = 'public/Downloaded/'+username;
  console.log(dir)

  const fs = require('fs')
  const youtubedl = require('youtube-dl')

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  var dir = 'public/Downloaded/'+username+'/downloads';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }

  const video = youtubedl(videourl,
  // Optional arguments passed to youtube-dl.
  ['--format=18'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname })

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log('Download started')
    console.log('filename: ' + info._filename)
    console.log('size: ' + info.size)
  })
video.pipe(fs.createWriteStream(dir+'/'+videoname+'.mp4'))
return res.send('Done')

})

app.get('/',function(req,res){
    return res.send('Hello Server')
})

app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        }
        return res.status(200).send(req.file)
        // Everything went fine.
      })
});


app.listen(port, function() {
    console.log('running on port: '+port);
});
