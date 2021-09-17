const Entretien = require('../models/entretien-model')



// creer un Entretien
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
   
    


    const entretien = new Entretien(body)

    if (!entretien) {
        return res.status(400).json({ success: false, error: err })
    }

    entretien
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: entretien._id,
                message: 'entretien creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'entretien non creer!',
            })
        })

       
  };


// mettre à jour un entretien
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Entretien.findOne({ _id: req.params.id }, (err, entretien) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun entretien trouvé !',
          })
      }
      
      entretien.titre = body.titre
      entretien.titre = body.titre
      entretien.description = body.description,
      entretien.date_debut = body.date_debut
      entretien.date_fin = body.date_fin,
      entretien.statut = body.statut
      entretien.concerner = body.concerner

      entretien
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: entretien._id,
                  message: 'entretien mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'entretien non mis à jour!',
              })
          })
  })

}


// supprimer un entretien
exports.deleteOne = async (req, res) => {
  
  await Entretien.findOneAndDelete({ _id: req.params.id }, (err, entretien) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!entretien) {
          return res
              .status(404)
              .json({ success: false, error: `aucun entretien trouvé` })
      }

      return res.status(200).json({ success: true, data: entretien })
  }).catch(err => console.log(err))
}


// obtenir un entretien
exports.getOne = async (req, res) => {
  await Entretien.findOne({ _id: req.params.id }, (err, entretien) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!entretien) {
          return res
              .status(404)
              .json({ success: false, error: `aucun entretien trouvé` })
      }
      return res.status(200).json({ success: true, data: entretien })
  }).catch(err => console.log(err))
}


// obtenir tous les entretien
exports.getAll = async (req, res) => {
  await Entretien.find({}, (err, entretien) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!entretien.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun entretien trouvé` })
      }
      return res.status(200).json({ success: true, data: entretien })
  }).catch(err => console.log(err))
}



// obtenir un getOwnEntretien
exports.getOwnEntretien = async (req, res) => {
    
    await Entretien.find({concerner: req.params.id }, (err, entretien) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!entretien) {
            return res
                .status(404)
                .json({ success: false, error: `aucun entretien trouvé` })
        }
        return res.status(200).json({ success: true, data: entretien })
    }).catch(err => console.log(err))
  }
  
// obtenir un getOwnEntretien
exports.getMesEntretien = async (req, res) => {
    
    await Entretien.find({entreprise_demandeur: req.params.id }, (err, entretien) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!entretien) {
            return res
                .status(404)
                .json({ success: false, error: `aucun entretien trouvé` })
        }
        return res.status(200).json({ success: true, data: entretien })
    }).catch(err => console.log(err))
  }


  
// modifier l'etat de l'entretien
exports.updateStatut = async (req, res) => {
    const body = req.body
console.log(body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Entretien.findOne({ _id: req.params.id }, (err, entretien) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun entretien trouvé !',
          })
      }
      
      entretien.statut = body.statut

      entretien
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: entretien._id,
                  statut: entretien.statut,
                  message: 'entretien etat mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'entretien etat non mis à jour!',
              })
          })
  })

}
  