const express = require('express')

const uploadEntreprise = require('../middleware/multer-config-entreprise');
const EntrepriseCtrl = require('../controllers/entreprise-ctrl')

const router = express.Router()

router.post('/',uploadEntreprise, EntrepriseCtrl.create)
router.put('/:id', EntrepriseCtrl.update)
router.delete('/:id', EntrepriseCtrl.deleteOne)
router.get('/:id', EntrepriseCtrl.getOne)
router.get('/', EntrepriseCtrl.getAll)


module.exports = router
