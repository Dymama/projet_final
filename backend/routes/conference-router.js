const express = require('express')

const ConferenceCtrl = require('../controllers/conference-ctrl')

const router = express.Router()

router.post('/', ConferenceCtrl.create)
router.put('/:id', ConferenceCtrl.update)
router.delete('/:id', ConferenceCtrl.deleteOne)
router.get('/:id', ConferenceCtrl.getOne)
router.get('/', ConferenceCtrl.getAll)


module.exports = router


