const Candidat = require('../models/candidat-model')

const Utilisateur = require('../models/utilisateur-model')


// creer un candidat
exports.create = (req, res, next) => {

  const body = req.body;
  console.log(body,'candidat cooool')
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const candidat = new Candidat({
        ...body,
        cv:`${req.protocol}://${req.get('host')}/cv/${req.file.filename}`
    })

    if (!candidat) {
        return res.status(400).json({ success: false, error: err })
    }

    candidat
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: candidat._id,
                message: 'candidat creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'candidat non creer!',
            })
        })

       
  };


// mettre à jour un candidat
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Candidat.findOne({ _id: req.params.id }, (err, candidat) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun candidat trouvé !',
          })
      }
      
      candidat.statut = body.statut
      candidat.utilisateur = body.utilisateur,
      
      candidat.niveau_etude = body.niveau_etude,
      candidat.cv = body.cv,
      candidat.annee_experience = body.annee_experience,
      candidat.poste_actuel = body.poste_actuel,
      candidat.point_fort = body.point_fort,
      candidat.point_faible = body.point_faible,
      
      candidat
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: candidat._id,
                  message: 'candidat mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'candidat non mis à jour!',
              })
          })
  })

}


// supprimer un candidat
exports.deleteOne = async (req, res) => {
  
  await Candidat.findOneAndDelete({ _id: req.params.id }, (err, candidat) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!candidat) {
          return res
              .status(404)
              .json({ success: false, error: `aucun candidat trouvé` })
      }

      return res.status(200).json({ success: true, data: candidat })
  }).catch(err => console.log(err))
}


// obtenir un Candidat
exports.getOne = async (req, res) => {
  await Candidat.findOne({ _id: req.params.id }, (err, candidat) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!candidat) {
          return res
              .status(404)
              .json({ success: false, error: `aucun candidat trouvé` })
      }
      return res.status(200).json({ success: true, data: candidat })
  }).catch(err => console.log(err))
}


// obtenir tous les candidat
exports.getAll = async (req, res) => {
  await Candidat.find({}, (err, candidat) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!candidat.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun candidat trouvé` })
      }
      return res.status(200).json({ success: true, data: candidat })
  }).catch(err => console.log(err))
}


// obtenir un Candidat par utilisateur
exports.getOneByUser = async (req, res) => {
    await Candidat.findOne({ utilisateur: req.params.id }, (err, candidat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!candidat) {
            return res
                .status(404)
                .json({ success: false, error: `aucun candidat trouvé` })
        }
        return res.status(200).json({ success: true, data: candidat })
    }).catch(err => console.log(err))
  }
  
  
  
  

  // obtenir tous les user and candidats

exports.getAllCandidatUser = async (req, res) => {
    await Candidat.find({}, (err, candidat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!candidat.length) {
            return res
                .status(404)
                .json({ success: false, error: ` aucun candidat trouvé` })
        }
        return res.status(200).json({ success: true, data: candidat })
    }).catch(err => console.log(err))
  }
  