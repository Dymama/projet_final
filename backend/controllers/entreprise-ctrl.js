const Entreprise = require('../models/entreprise-model')



// creer un Entreprise
exports.create = (req, res, next) => {

  const body = req.body;
  console.log(body,'entreprise')
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const entreprise = new Entreprise({
        ...body,
        photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
       } )

    if (!entreprise) {
        return res.status(400).json({ success: false, error: err })
    }

    entreprise
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: entreprise._id,
                message: 'entreprise creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'entreprise non creer!',
            })
        })

       
  };


// mettre à jour un entreprise
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Entreprise.findOne({ _id: req.params.id }, (err, entreprise) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun entreprise trouvé !',
          })
      }
      
      entreprise.nom = body.nom
      entreprise.adresse = body.adresse
      entreprise.description = body.description,
      entreprise.pays = body.pays
      entreprise.ville = body.ville,
      entreprise.secteur = body.secteur,
      entreprise.telephone = body.telephone
      entreprise.photoUrl = body.photoUrl,
      entreprise.site_internet = body.site_internet
      entreprise.linkedin = body.linkedin,
      entreprise.facebook = body.facebook,
      entreprise.video = body.video,
      entreprise.statut = body.statut
      
      entreprise
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: entreprise._id,
                  message: 'entreprise mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'entreprise non mis à jour!',
              })
          })
  })

}


// supprimer un entreprise
exports.deleteOne = async (req, res) => {
  
  await Entreprise.findOneAndDelete({ _id: req.params.id }, (err, entreprise) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!entreprise) {
          return res
              .status(404)
              .json({ success: false, error: `aucun entreprise trouvé` })
      }

      return res.status(200).json({ success: true, data: entreprise })
  }).catch(err => console.log(err))
}


// obtenir un entreprise
exports.getOne = async (req, res) => {
  await Entreprise.findOne({ _id: req.params.id }, (err, entreprise) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!entreprise) {
          return res
              .status(404)
              .json({ success: false, error: `aucun entreprise trouvé` })
      }
      return res.status(200).json({ success: true, data: entreprise })
  }).catch(err => console.log(err))
}


// obtenir tous les entreprise
exports.getAll = async (req, res) => {
  await Entreprise.find({}, (err, entreprise) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!entreprise.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun entreprise trouvé` })
      }
      return res.status(200).json({ success: true, data: entreprise })
  }).catch(err => console.log(err))
}