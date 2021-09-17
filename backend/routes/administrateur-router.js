const express = require('express')

const AdministrateurCtrl = require('../controllers/administrateur-ctrl')

const router = express.Router()

router.post('/', AdministrateurCtrl.create)
router.put('/:id', AdministrateurCtrl.update)
router.delete('/:id', AdministrateurCtrl.deleteOne)
router.get('/:id', AdministrateurCtrl.getOne)
router.get('/getbyuser/:id', AdministrateurCtrl.getByuser)
router.get('/', AdministrateurCtrl.getAll)


module.exports = router
