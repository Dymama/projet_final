const Postuler = require('../models/postuler-model')



// creer un Postuler
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const postuler = new Postuler(body)

    if (!postuler) {
        return res.status(400).json({ success: false, error: err })
    }

    postuler
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: postuler._id,
                message: 'postuler creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'postuler non creer!',
            })
        })

       
  };


// mettre à jour un postuler
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Postuler.findOne({ _id: req.params.id }, (err, postuler) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun postuler trouvé !',
          })
      }
      
      postuler.candidat = body.candidat,
      postuler.poste = body.poste,
      
      postuler
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: postuler._id,
                  message: 'postuler mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'postuler non mis à jour!',
              })
          })
  })

}


// supprimer un postuler
exports.deleteOne = async (req, res) => {
  
  await Postuler.findOneAndDelete({ _id: req.params.id }, (err, postuler) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!postuler) {
          return res
              .status(404)
              .json({ success: false, error: `aucun postuler trouvé` })
      }

      return res.status(200).json({ success: true, data: postuler })
  }).catch(err => console.log(err))
}


// obtenir un postuler
exports.getOne = async (req, res) => {
  await Postuler.findOne({ _id: req.params.id }, (err, postuler) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!postuler) {
          return res
              .status(404)
              .json({ success: false, error: `aucun postuler trouvé` })
      }
      return res.status(200).json({ success: true, data: postuler })
  }).catch(err => console.log(err))
}


// obtenir tous les postuler
exports.getAll = async (req, res) => {
  await Postuler.find({}, (err, postuler) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!postuler.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun postuler trouvé` })
      }
      return res.status(200).json({ success: true, data: postuler })
  }).catch(err => console.log(err))
}