const express = require('express')

const ParticipateEntrepriseCtrl = require('../controllers/participateEntreprise-ctrl')

const router = express.Router()

router.post('/', ParticipateEntrepriseCtrl.create)
router.put('/:id', ParticipateEntrepriseCtrl.update)
router.delete('/:id', ParticipateEntrepriseCtrl.deleteOne)
router.get('/:id', ParticipateEntrepriseCtrl.getOne)
router.get('/', ParticipateEntrepriseCtrl.getAll)


module.exports = router
