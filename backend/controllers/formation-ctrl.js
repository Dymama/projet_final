const Formation = require('../models/formation-model')



// creer un Formation
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const formation = new Formation(body)

    if (!formation) {
        return res.status(400).json({ success: false, error: err })
    }

    formation
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: formation._id,
                message: 'formation creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'formation non creer!',
            })
        })

       
  };


// mettre à jour un formation
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Formation.findOne({ _id: req.params.id }, (err, formation) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun formation trouvé !',
          })
      }
      
      formation.titre = body.titre
      formation.description = body.description,
      formation.pays = body.pays
      formation.ville = body.ville,
      formation.video = body.video
      formation.image = body.image,
      formation.date_debut = body.date_debut
      formation.date_fin = body.date_fin,
      formation.statut = body.statut
      formation.entreprise = body.entreprise,
      formation.event = body.event
      
      formation
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: formation._id,
                  message: 'formation mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'formation non mis à jour!',
              })
          })
  })

}


// supprimer un formation
exports.deleteOne = async (req, res) => {
  
  await Formation.findOneAndDelete({ _id: req.params.id }, (err, formation) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!formation) {
          return res
              .status(404)
              .json({ success: false, error: `aucun formation trouvé` })
      }

      return res.status(200).json({ success: true, data: formation })
  }).catch(err => console.log(err))
}


// obtenir un formation
exports.getOne = async (req, res) => {
  await Formation.findOne({ _id: req.params.id }, (err, formation) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!formation) {
          return res
              .status(404)
              .json({ success: false, error: `aucun formation trouvé` })
      }
      return res.status(200).json({ success: true, data: formation })
  }).catch(err => console.log(err))
}


// obtenir tous les formation
exports.getAll = async (req, res) => {
  await Formation.find({}, (err, formation) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!formation.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun formation trouvé` })
      }
      return res.status(200).json({ success: true, data: formation })
  }).catch(err => console.log(err))
}


// supprimer un formation
exports.deleteAllFormationFromEvent = async (req, res) => {
  
    await Formation.deleteMany({ evenement: req.params.id }, (err, formation) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!formation) {
            return res
                .status(404)
                .json({ success: false, error: `aucun formation trouvé` })
        }
  
        return res.status(200).json({ success: true, data: formation })
    }).catch(err => console.log(err))
  }