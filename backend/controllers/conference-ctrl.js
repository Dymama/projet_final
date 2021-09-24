const Conference = require('../models/conference-model')



// creer un conference
exports.create = (req, res, next) => {

  const body = req.body;
  console.log(body)
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const conference = new Conference(body)

    if (!conference) {
        return res.status(400).json({ success: false, error: err })
    }

    conference
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: conference._id,
                message: 'conference creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'conference non creer!',
            })
        })

       
  };


// mettre à jour un conference
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Conference.findOne({ _id: req.params.id }, (err, conference) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun conference trouvé !',
          })
      }
      
      conference.titre = body.titre
      conference.description = body.description
      conference.pays = body.pays
      conference.ville = body.ville
      conference.video = body.video
      conference.image = body.image
      conference.date_debut = body.date_debut
      conference.date_fin = body.date_fin
      conference.statut = body.statut
      conference.entreprise = body.entreprise
      conference.event = body.event
      
      conference
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: conference._id,
                  message: 'conference mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'conference non mis à jour!',
              })
          })
  })

}


// supprimer un conference
exports.deleteOne = async (req, res) => {
  
  await Conference.findOneAndDelete({ _id: req.params.id }, (err, conference) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!conference) {
          return res
              .status(404)
              .json({ success: false, error: `aucun conference trouvé` })
      }

      return res.status(200).json({ success: true, data: conference })
  }).catch(err => console.log(err))
}


// obtenir un conference
exports.getOne = async (req, res) => {
  await Conference.findOne({ _id: req.params.id }, (err, conference) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!conference) {
          return res
              .status(404)
              .json({ success: false, error: `aucun conference trouvé` })
      }
      return res.status(200).json({ success: true, data: conference })
  }).catch(err => console.log(err))
}


// obtenir tous les conference
exports.getAll = async (req, res) => {
  await Conference.find({}, (err, conference) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!conference.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun conference trouvé` })
      }
      return res.status(200).json({ success: true, data: conference })
  }).catch(err => console.log(err))
}



// poste ler a un evenement
exports.getEventConference = async (req, res) => {
    await Conference.find({evenement: req.params.id }, (err, conference) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!conference) {
            return res
                .status(404)
                .json({ success: false, error: `aucun conference trouvé` })
        }
        return res.status(200).json({ success: true, data: conference })
    }).catch(err => console.log(err))
  }
  