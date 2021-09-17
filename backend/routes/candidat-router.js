const express = require('express')

const CandidatCtrl = require('../controllers/candidat-ctrl')

const auth = require('../middleware/auth');
const uploadFile = require('../middleware/multer-file-config');

const router = express.Router()

router.post('/',uploadFile, CandidatCtrl.create)
router.put('/:id', CandidatCtrl.update)
router.delete('/:id', CandidatCtrl.deleteOne)
router.get('/:id', CandidatCtrl.getOne)
router.get('/get_by_user/:id', CandidatCtrl.getOneByUser)
router.get('/', CandidatCtrl.getAll) 

// router.get('/getUser',CandidatCtrl.candidatInfo)


module.exports = router
