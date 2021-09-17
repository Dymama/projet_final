const ParticipateEntreprise = require('../models/participateEntreprise-model')



// creer un ParticipateEntreprise
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const participateEntreprise = new ParticipateEntreprise(body)

    if (!participateEntreprise) {
        return res.status(400).json({ success: false, error: err })
    }

    participateEntreprise
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: participateEntreprise._id,
                message: 'participateEntreprise creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'participateEntreprise non creer!',
            })
        })

       
  };


// mettre à jour un participateEntreprise
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    ParticipateEntreprise.findOne({ _id: req.params.id }, (err, participateEntreprise) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun participateEntreprise trouvé !',
          })
      }
      
      participateEntreprise.type = body.type
      participateEntreprise.entreprise = body.entreprise,
      participateEntreprise.event = body.event
      
      participateEntreprise
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: participateEntreprise._id,
                  message: 'participateEntreprise mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'participateEntreprise non mis à jour!',
              })
          })
  })

}


// supprimer un participateEntreprise
exports.deleteOne = async (req, res) => {
  
  await ParticipateEntreprise.findOneAndDelete({ _id: req.params.id }, (err, participateEntreprise) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!participateEntreprise) {
          return res
              .status(404)
              .json({ success: false, error: `aucun participateEntreprise trouvé` })
      }

      return res.status(200).json({ success: true, data: participateEntreprise })
  }).catch(err => console.log(err))
}


// obtenir un participateEntreprise
exports.getOne = async (req, res) => {
  await ParticipateEntreprise.findOne({ _id: req.params.id }, (err, participateEntreprise) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!participateEntreprise) {
          return res
              .status(404)
              .json({ success: false, error: `aucun participateEntreprise trouvé` })
      }
      return res.status(200).json({ success: true, data: participateEntreprise })
  }).catch(err => console.log(err))
}


// obtenir tous les participateEntreprise
exports.getAll = async (req, res) => {
  await ParticipateEntreprise.find({}, (err, participateEntreprise) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!participateEntreprise.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun participateEntreprise trouvé` })
      }
      return res.status(200).json({ success: true, data: participateEntreprise })
  }).catch(err => console.log(err))
}