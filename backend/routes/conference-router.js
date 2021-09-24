const express = require('express')

const ConferenceCtrl = require('../controllers/conference-ctrl')

const router = express.Router()

router.post('/', ConferenceCtrl.create)
router.put('/:id', ConferenceCtrl.update)
router.delete('/:id', ConferenceCtrl.deleteOne)
router.get('/:id', ConferenceCtrl.getOne)
router.get('/', ConferenceCtrl.getAll)
router.get('/get_event_conference/:id', ConferenceCtrl.getEventConference)

module.exports = router


