const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const upload = require('../middleware/multer-config');
const uploadEntreprise = require('../middleware/multer-config-entreprise');
const userCtrl = require('../controllers/utilisateur-ctrl');


// router pour l'inscription
// router.post('/signup',auth,multer, userCtrl.signup);
router.post('/signup',upload, userCtrl.signup);
router.post('/signup/entreprise',uploadEntreprise, userCtrl.signupEntreprise);

// router pour la connexion
router.post('/login', userCtrl.login);
router.get('/getlogin/:id',userCtrl.getLogin);

router.get('/logout', userCtrl.logout);

router.get('/',userCtrl.getAll);
router.get('/:id', userCtrl.getOne);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.deleteOne);
router.get('/getentreprise/:id', userCtrl.getEntrepriseDetail);
router.get('/get_info_user_candidat/:id', userCtrl.getInfoUSerCandidat);
router.get('/get_all_user_by_type/:type', userCtrl.getAllUserByType);



module.exports = router;