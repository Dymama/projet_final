const express = require('express')

const EntretienCtrl = require('../controllers/entretien-ctrl')

const router = express.Router()

router.post('/', EntretienCtrl.create)
router.put('/:id', EntretienCtrl.update)
router.put('/updatestatut/:id', EntretienCtrl.updateStatut)
router.delete('/:id', EntretienCtrl.deleteOne)
router.get('/:id', EntretienCtrl.getOne)
router.get('/ownentretien/:id', EntretienCtrl.getOwnEntretien)
router.get('/mesentretien/:id', EntretienCtrl.getMesEntretien)
router.get('/', EntretienCtrl.getAll)

module.exports = router
