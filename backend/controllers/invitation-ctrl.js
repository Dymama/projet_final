const Invitation = require('../models/invitation-model')



// creer un Entretien
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    const invitation = new Invitation(body)

    if (!invitation) {
        return res.status(400).json({ success: false, error: err })
    }

    invitation
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: invitation._id,
                message: 'invitation creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'invitation non creer!',
            })
        })

       
  };


// mettre à jour un invitation
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Invitation.findOne({ _id: req.params.id }, (err, invitation) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun invitation trouvé !',
          })
      }
      
      invitation.titre = body.titre
      invitation.description = body.description,
      entretien.date_debut = body.date_debut
      entretien.date_fin = body.date_fin,
      entretien.statut = body.statut

      entretien.entreprise_demandeur = body.entreprise_demandeur,
      entretien.entreprise_receveur = body.entreprise_receveur,      
      entretien.invitation = body.invitation

      invitation
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: invitation._id,
                  message: 'invitation mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'invitation non mis à jour!',
              })
          })
  })

}


// supprimer un invitation
exports.deleteOne = async (req, res) => {
  
  await Entretien.findOneAndDelete({ _id: req.params.id }, (err, invitation) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!invitation) {
          return res
              .status(404)
              .json({ success: false, error: `aucun invitation trouvé` })
      }

      return res.status(200).json({ success: true, data: invitation })
  }).catch(err => console.log(err))
}


// obtenir un invitation
exports.getOne = async (req, res) => {
  await Invitation.findOne({ _id: req.params.id }, (err, invitation) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!invitation) {
          return res
              .status(404)
              .json({ success: false, error: `aucun invitation trouvé` })
      }
      return res.status(200).json({ success: true, data: invitation })
  }).catch(err => console.log(err))
}


// obtenir tous les invitation
exports.getAll = async (req, res) => {
  await Invitation.find({}, (err, invitation) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!invitation.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun invitation trouvé` })
      }
      return res.status(200).json({ success: true, data: invitation })
  }).catch(err => console.log(err))
}



// mettre à jour un invitation
exports.changeEtat = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Invitation.findOne({ _id: req.params.id }, (err, invitation) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun entretien trouvé !',
          })
      }
      
      invitation.statut = body.statut

      invitation
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: invitation._id,
                  message: 'invitation mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'invitation non mis à jour!',
              })
          })
  })

}