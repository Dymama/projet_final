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
router.get('/entreprise_entretien/:id', EntretienCtrl.getEntrepriseEntretien)
router.get('/candidat_list_entretien/:id', EntretienCtrl.getCandidatEntretien)
router.get('/demande_entretien/:id', EntretienCtrl.getDemandeEntretien)
router.get('/', EntretienCtrl.getAll)

module.exports = router
