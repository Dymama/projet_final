const multer = require('multer');


const DIR = "./fichier/"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
  });


const uploadFile = multer({ storage: storage }).single('cv')

module.exports = uploadFile;