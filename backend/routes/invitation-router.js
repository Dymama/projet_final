const express = require('express')

const InvitationCtrl = require('../controllers/invitation-ctrl')

const router = express.Router()

router.post('/', InvitationCtrl.create)
router.put('/:id', InvitationCtrl.update)
router.put('/:id', InvitationCtrl.changeEtat)
router.delete('/:id', InvitationCtrl.deleteOne)
router.get('/:id', InvitationCtrl.getOne)
router.get('/', InvitationCtrl.getAll)

module.exports = router
