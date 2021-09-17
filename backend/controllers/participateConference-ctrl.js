const ParticipateConference = require('../models/participateConference-model')



// creer un ParticipateConference
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const participateConference = new ParticipateConference(body)

    if (!participateConference) {
        return res.status(400).json({ success: false, error: err })
    }

    participateConference
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: participateConference._id,
                message: 'participateConference creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'participateConference non creer!',
            })
        })

       
  };


// mettre à jour un participateConference
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    ParticipateConference.findOne({ _id: req.params.id }, (err, participateConference) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun participateConference trouvé !',
          })
      }
      
      participateConference.type = body.type
      participateConference.conferencier = body.conferencier,
      participateConference.conference = body.conference
      

      participateConference
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: participateConference._id,
                  message: 'participateConference mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'participateConference non mis à jour!',
              })
          })
  })

}


// supprimer un participateConference
exports.deleteOne = async (req, res) => {
  
  await ParticipateConference.findOneAndDelete({ _id: req.params.id }, (err, participateConference) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!participateConference) {
          return res
              .status(404)
              .json({ success: false, error: `aucun participateConference trouvé` })
      }

      return res.status(200).json({ success: true, data: participateConference })
  }).catch(err => console.log(err))
}

// obtenir un participateConference
exports.getOne = async (req, res) => {
  await ParticipateConference.findOne({ _id: req.params.id }, (err, participateConference) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!participateConference) {
          return res
              .status(404)
              .json({ success: false, error: `aucun participateConference trouvé` })
      }
      return res.status(200).json({ success: true, data: participateConference })
  }).catch(err => console.log(err))
}

// obtenir tous les participateConference
exports.getAll = async (req, res) => {
  await ParticipateConference.find({}, (err, participateConference) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!participateConference.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun participateConference trouvé` })
      }
      return res.status(200).json({ success: true, data: participateConference })
  }).catch(err => console.log(err))
}