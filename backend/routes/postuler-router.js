const express = require('express')

const PostulerCtrl = require('../controllers/postuler-ctrl')

const router = express.Router()

router.post('/', PostulerCtrl.create)
router.put('/:id', PostulerCtrl.update)
router.delete('/:id', PostulerCtrl.deleteOne)
router.get('/:id', PostulerCtrl.getOne)
router.get('/', PostulerCtrl.getAll)


module.exports = router
