const ParticipateFormation = require('../models/participateFormation-model')



// creer un ParticipateFormation
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const participateFormation = new ParticipateFormation(body)

    if (!participateFormation) {
        return res.status(400).json({ success: false, error: err })
    }

    participateFormation
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: participateFormation._id,
                message: 'participateFormation creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'participateFormation non creer!',
            })
        })

       
  };


// mettre à jour un participateFormation
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    ParticipateFormation.findOne({ _id: req.params.id }, (err, participateFormation) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun participateFormation trouvé !',
          })
      }
      
      participateFormation.type = body.type,
      participateFormation.formateur = body.formateur,
      participateFormation.formation = body.formation
      

      participateFormation
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: participateFormation._id,
                  message: 'participateFormation mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'participateFormation non mis à jour!',
              })
          })
  })

}


// supprimer un participateFormation
exports.deleteOne = async (req, res) => {
  
  await ParticipateFormation.findOneAndDelete({ _id: req.params.id }, (err, participateFormation) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!participateFormation) {
          return res
              .status(404)
              .json({ success: false, error: `aucun participateFormation trouvé` })
      }

      return res.status(200).json({ success: true, data: participateFormation })
  }).catch(err => console.log(err))
}


// obtenir un participateFormation
exports.getOne = async (req, res) => {
  await ParticipateFormation.findOne({ _id: req.params.id }, (err, participateFormation) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!participateFormation) {
          return res
              .status(404)
              .json({ success: false, error: `aucun participateFormation trouvé` })
      }
      return res.status(200).json({ success: true, data: participateFormation })
  }).catch(err => console.log(err))
}


// obtenir tous les participateFormation
exports.getAll = async (req, res) => {
  await ParticipateFormation.find({}, (err, participateFormation) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!participateFormation.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun participateFormation trouvé` })
      }
      return res.status(200).json({ success: true, data: participateFormation })
  }).catch(err => console.log(err))
}