const multer = require('multer');


const DIR = "./images/entreprise/"


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, Date.now() + '-' + fileName)
  }
});

const uploadEntreprise = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error(' .png, .jpg and .jpeg format autorisés !'));
      }
  }
}).single('photo');

module.exports = uploadEntreprise;