require('dotenv').config()
const express = require('express');
const fs = require('fs');
const path = require('path')
const app = express();
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
var multer  = require('multer');

var verifyToken = require('./middleware/verifyToken').verifyToken


// mongo connection : add env config file later
mongoose.connect('mongodb://localhost/chromosome', { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("db connected");
});

// multer file upload
var upload = multer({
  dest: './public/uploads/',
  limit:{
      fileSize:10000000
  }
})


app.use(cors())
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
const port = process.env.PORT || 3003;
const router = express.Router();
const filerouter = express.Router();
app.use(express.static(path.join(__dirname, 'public')))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// require routers
const postController = require('./controller/postController')
const userController = require('./controller/userController')
const fileUpload = require('./controller/fileUpload')



// handle routers
router.post('/postcontent', verifyToken, postController.postContent)
router.post('/register', userController.registerUser)
router.post('/login', userController.logInUser)
router.post('/findusername', userController.findUserName)
router.post('/upload', upload.single('file'), fileUpload.upload)

app.use('/api',router);

// to host image folder
let images = express.static(path.join(__dirname, 'public/uploads'))
app.use('/api/image',images);

app.use('/*', function(req, res){
  res.status(404).sendFile('./public/404.html', {root:__dirname});
});
app.listen(port, () => console.log(`listning on port ${port}`));