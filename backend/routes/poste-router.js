const express = require('express')

const posteCtrl = require('../controllers/poste-ctrl')

const router = express.Router()

router.post('/', posteCtrl.create)
router.put('/:id', posteCtrl.update)
router.put('/add_postulant/:id', posteCtrl.addPostulant)
router.put('/delete_postulant/:id', posteCtrl.deletePostulant)
router.get('/get_event_poste/:id', posteCtrl.getEventPoste)
router.get('/get_poste_by_entreprise/:id', posteCtrl.getPosteByEntreprise)
router.delete('/:id', posteCtrl.deleteOne)
router.delete('delete_all_poste_event/:id', posteCtrl.deleteAllPosteFromEvent)
router.get('/:id', posteCtrl.getOne)
router.get('/', posteCtrl.getAll)


module.exports = router
