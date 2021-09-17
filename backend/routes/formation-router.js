const express = require('express')

const FormationCtrl = require('../controllers/formation-ctrl')

const router = express.Router()

router.post('/', FormationCtrl.create)
router.put('/:id', FormationCtrl.update)
router.delete('/:id', FormationCtrl.deleteOne)
router.get('/:id', FormationCtrl.getOne)
router.get('/', FormationCtrl.getAll)


module.exports = router
