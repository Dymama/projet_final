const express = require('express')

const upload = require('../middleware/multer-config');
const EntrepriseCtrl = require('../controllers/entreprise-ctrl')

const router = express.Router()

router.post('/',upload, EntrepriseCtrl.create)
router.put('/:id', EntrepriseCtrl.update)
router.delete('/:id', EntrepriseCtrl.deleteOne)
router.get('/:id', EntrepriseCtrl.getOne)
router.get('/', EntrepriseCtrl.getAll)


module.exports = router
