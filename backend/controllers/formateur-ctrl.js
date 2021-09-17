const Formateur = require('../models/formateur-model')



// creer un Formateur
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const formateur = new Formateur(body)

    if (!formateur) {
        return res.status(400).json({ success: false, error: err })
    }

    formateur
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: formateur._id,
                message: 'formateur creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'formateur non creer!',
            })
        })

       
  };


// mettre à jour un formateur
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Formateur.findOne({ _id: req.params.id }, (err, formateur) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun formateur trouvé !',
          })
      }
      formateur.utilisateur = body.utilisateur,
      
      formateur
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: formateur._id,
                  message: 'formateur mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'formateur non mis à jour!',
              })
          })
  })

}


// supprimer un formateur
exports.deleteOne = async (req, res) => {
  
  await Formateur.findOneAndDelete({ _id: req.params.id }, (err, formateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!formateur) {
          return res
              .status(404)
              .json({ success: false, error: `aucun formateur trouvé` })
      }

      return res.status(200).json({ success: true, data: formateur })
  }).catch(err => console.log(err))
}


// obtenir un formateur
exports.getOne = async (req, res) => {
  await Formateur.findOne({ _id: req.params.id }, (err, formateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!formateur) {
          return res
              .status(404)
              .json({ success: false, error: `aucun formateur trouvé` })
      }
      return res.status(200).json({ success: true, data: formateur })
  }).catch(err => console.log(err))
}


// obtenir tous les formateur
exports.getAll = async (req, res) => {
  await Formateur.find({}, (err, formateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!formateur.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun formateur trouvé` })
      }
      return res.status(200).json({ success: true, data: formateur })
  }).catch(err => console.log(err))
}