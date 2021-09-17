const Conferencier = require('../models/conferencier-model')



// creer un Conferencier
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const conferencier = new Conferencier(body)

    if (!conferencier) {
        return res.status(400).json({ success: false, error: err })
    }

    conferencier
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: conferencier._id,
                message: 'conferencier creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'conferencier non creer!',
            })
        })

       
  };


// mettre à jour un conferencier
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Conferencier.findOne({ _id: req.params.id }, (err, conferencier) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun conferencier trouvé !',
          })
      }
      conferencier.utilisateur = body.utilisateur,
      
      conferencier
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: conferencier._id,
                  message: 'conferencier mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'conferencier non mis à jour!',
              })
          })
  })

}


// supprimer un conferencier
exports.deleteOne = async (req, res) => {
  
  await Conferencier.findOneAndDelete({ _id: req.params.id }, (err, conferencier) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!conferencier) {
          return res
              .status(404)
              .json({ success: false, error: `aucun conferencier trouvé` })
      }

      return res.status(200).json({ success: true, data: conferencier })
  }).catch(err => console.log(err))
}


// obtenir un conferencier
exports.getOne = async (req, res) => {
  await Conferencier.findOne({ _id: req.params.id }, (err, conferencier) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!conferencier) {
          return res
              .status(404)
              .json({ success: false, error: `aucun conferencier trouvé` })
      }
      return res.status(200).json({ success: true, data: conferencier })
  }).catch(err => console.log(err))
}


// obtenir tous les conferencier
exports.getAll = async (req, res) => {
  await Conferencier.find({}, (err, conferencier) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!conferencier.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun conferencier trouvé` })
      }
      return res.status(200).json({ success: true, data: conferencier })
  }).catch(err => console.log(err))
}