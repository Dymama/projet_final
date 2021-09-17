const express = require('express')

const ConferencierCtrl = require('../controllers/conferencier-ctrl')

const router = express.Router()

router.post('/', ConferencierCtrl.create)
router.put('/:id', ConferencierCtrl.update)
router.delete('/:id', ConferencierCtrl.deleteOne)
router.get('/:id', ConferencierCtrl.getOne)
router.get('/', ConferencierCtrl.getAll)


module.exports = router
