var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  // 'upfile' should match the field name in the form used to upload the file
  console.log('File information:', req.file);
  console.log('Form fields:', req.body);
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});