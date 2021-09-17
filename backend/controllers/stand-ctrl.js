const Stand = require('../models/stand-model')



// creer un Stand
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const stand = new Stand(body)

    if (!stand) {
        return res.status(400).json({ success: false, error: err })
    }

    stand
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: stand._id,
                message: 'stand creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'stand non creer!',
            })
        })

       
  };


// mettre à jour un stand
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Stand.findOne({ _id: req.params.id }, (err, stand) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun stand trouvé !',
          })
      }
      
      stand.image = body.image,
      stand.video = body.video,
      stand.statut = body.statut,
      stand.entreprise = body.entreprise
      stand.event = body.event

    
      stand
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: stand._id,
                  message: 'stand mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'stand non mis à jour!',
              })
          })
  })

}


// supprimer un stand
exports.deleteOne = async (req, res) => {
  
  await Stand.findOneAndDelete({ _id: req.params.id }, (err, stand) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!stand) {
          return res
              .status(404)
              .json({ success: false, error: `aucun stand trouvé` })
      }

      return res.status(200).json({ success: true, data: stand })
  }).catch(err => console.log(err))
}


// obtenir un stand
exports.getOne = async (req, res) => {
  await Stand.findOne({ _id: req.params.id }, (err, stand) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!stand) {
          return res
              .status(404)
              .json({ success: false, error: `aucun stand trouvé` })
      }
      return res.status(200).json({ success: true, data: stand })
  }).catch(err => console.log(err))
}


// obtenir tous les stand
exports.getAll = async (req, res) => {
  await Stand.find({}, (err, stand) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!stand.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun stand trouvé` })
      }
      return res.status(200).json({ success: true, data: stand })
  }).catch(err => console.log(err))
}