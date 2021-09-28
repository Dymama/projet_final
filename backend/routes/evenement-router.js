const express = require('express')
const upload = require('../middleware/multer-config');
const uploadMultipleFile = require('../middleware/multer-multiple-file');

const EvenementCtrl = require('../controllers/evenement-ctrl')

const router = express.Router()

router.post('/',uploadMultipleFile, EvenementCtrl.create)
router.put('/:id',upload, EvenementCtrl.update)
router.put('/add_participant/:id', EvenementCtrl.addParticipant)
router.put('/delete_participant/:id', EvenementCtrl.deleteParticipant)
router.delete('/:id', EvenementCtrl.deleteOne)
router.get('/:id', EvenementCtrl.getOne)
router.get('/', EvenementCtrl.getAll)


module.exports = router
