const express = require('express')

const ParticipateConferenceCtrl = require('../controllers/participateConference-ctrl')

const router = express.Router()

router.post('/', ParticipateConferenceCtrl.create)
router.put('/:id', ParticipateConferenceCtrl.update)
router.delete('/:id', ParticipateConferenceCtrl.deleteOne)
router.get('/:id', ParticipateConferenceCtrl.getOne)
router.get('/', ParticipateConferenceCtrl.getAll)


module.exports = router
