const express = require('express')

const ParticipateFormationCtrl = require('../controllers/participateFormation-ctrl')

const router = express.Router()

router.post('/', ParticipateFormationCtrl.create)
router.put('/:id', ParticipateFormationCtrl.update)
router.delete('/:id', ParticipateFormationCtrl.deleteOne)
router.get('/:id', ParticipateFormationCtrl.getOne)
router.get('/', ParticipateFormationCtrl.getAll)

module.exports = router
