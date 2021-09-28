let multer = require('multer');

const DIR = './images/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now()+ '-' + fileName)
    }
});

 const uploadMultipleFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Format d'images autorisés .png, .jpg , .jpeg"));
        }
    }
}).array('images', 6);

module.exports = uploadMultipleFile ;

