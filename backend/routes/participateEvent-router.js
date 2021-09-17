const express = require('express')

const ParticipateEventCtrl = require('../controllers/participateEvent-ctrl')

const router = express.Router()

router.post('/', ParticipateEventCtrl.create)
router.put('/:id', ParticipateEventCtrl.update)
router.delete('/:id', ParticipateEventCtrl.deleteOne)
router.get('/:id', ParticipateEventCtrl.getOne)
router.get('/', ParticipateEventCtrl.getAll)
router.post('/participateverify', ParticipateEventCtrl.participateVerify)

module.exports = router
