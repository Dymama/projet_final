const express = require('express')

const StandCtrl = require('../controllers/stand-ctrl')

const router = express.Router()

router.post('/', StandCtrl.create)
router.put('/:id', StandCtrl.update)
router.delete('/:id', StandCtrl.deleteOne)
router.get('/:id', StandCtrl.getOne)
router.get('/', StandCtrl.getAll)

module.exports = router
