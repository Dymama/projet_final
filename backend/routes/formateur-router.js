const express = require('express')

const FormateurCtrl = require('../controllers/formateur-ctrl')

const router = express.Router()

router.post('/', FormateurCtrl.create)
router.put('/:id', FormateurCtrl.update)
router.delete('/:id', FormateurCtrl.deleteOne)
router.get('/:id', FormateurCtrl.getOne)
router.get('/', FormateurCtrl.getAll)

module.exports = router
