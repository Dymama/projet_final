const express = require('express')

const AgendaCtrl = require('../controllers/agenda-ctrl')

const router = express.Router()

router.post('/', AgendaCtrl.create)
router.put('/:id', AgendaCtrl.update)
router.delete('/:id', AgendaCtrl.deleteOne)
router.get('/:id', AgendaCtrl.getOne)
router.get('/getAgenda/:id', AgendaCtrl.getByProp)
router.get('/', AgendaCtrl.getAll)
router.put('/modifagenda/:id', AgendaCtrl.addEvent)


module.exports = router
