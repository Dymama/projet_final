const express = require('express')

const posteCtrl = require('../controllers/poste-ctrl')

const router = express.Router()

router.post('/', posteCtrl.create)
router.put('/:id', posteCtrl.update)
router.put('/add_postulant/:id', posteCtrl.addPostulant)
router.put('/delete_postulant/:id', posteCtrl.deletePostulant)
router.get('/get_event_poste/:id', posteCtrl.getEventPoste)
router.delete('/:id', posteCtrl.deleteOne)
router.get('/:id', posteCtrl.getOne)
router.get('/', posteCtrl.getAll)


module.exports = router
