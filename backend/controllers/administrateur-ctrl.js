const Administrateur = require('../models/administrateur-model')



// creer un administrateur
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const administrateur = new Administrateur(body)

    if (!administrateur) {
        return res.status(400).json({ success: false, error: err })
    }

    administrateur
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: administrateur._id,
                message: 'Administrateur creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Administrateur non creer!',
            })
        })

       
  };


// mettre à jour un Administrateur
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Administrateur.findOne({ _id: req.params.id }, (err, administrateur) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun Administrateur trouvé !',
          })
      }
      
      administrateur.utilisateur = body.utilisateur,
      administrateur.entreprise = body.entreprise,
      administrateur.role = body.role,
      administrateur.statut = body.statut
      
      administrateur
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: administrateur._id,
                  message: 'administrateur mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'administrateur non mis à jour!',
              })
          })
  })

}


// supprimer un administrateur
exports.deleteOne = async (req, res) => {
  
  await Administrateur.findOneAndDelete({ _id: req.params.id }, (err, administrateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!administrateur) {
          return res
              .status(404)
              .json({ success: false, error: `aucun administrateur trouvé` })
      }

      return res.status(200).json({ success: true, data: administrateur })
  }).catch(err => console.log(err))
}


// obtenir un administrateur
exports.getByuser = async (req, res) => {
  await Administrateur.findOne({utilisateur: req.params.id }, (err, administrateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!administrateur) {
          return res
              .status(404)
              .json({ success: false, error: `aucun administrateur trouvé` })
      }
      return res.status(200).json({ success: true, data: administrateur })
  }).catch(err => console.log(err))
}


// obtenir un administrateur
exports.getOne = async (req, res) => {
    await Administrateur.findOne({ _id: req.params.id }, (err, administrateur) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!administrateur) {
            return res
                .status(404)
                .json({ success: false, error: `aucun administrateur trouvé` })
        }
        return res.status(200).json({ success: true, data: administrateur })
    }).catch(err => console.log(err))
  }

  


// obtenir tous les administrateur
exports.getAll = async (req, res) => {
  await Administrateur.find({}, (err, administrateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!administrateur.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun administrateur trouvé` })
      }
      return res.status(200).json({ success: true, data: administrateur })
  }).catch(err => console.log(err))
}