const Evenement = require('../models/evenement-model')
const Administrateur = require('../models/administrateur-model')



// creer un Evenement
exports.create = (req, res, next) => {

    const body = req.body;
    const reqFiles = [];

    console.log(body,'body event')
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/images/' + req.files[i].filename)
    }
    
    const evenement = new Evenement({
        ...body,
        chronogramme:JSON.parse(body.chronogramme),
        images: reqFiles
        
    })

    console.log(evenement,"new event container")


    if (!evenement) {
        return res.status(400).json({ success: false, error: err })
    }

    evenement
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: evenement._id,
                message: 'evenement creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'evenement non creer!',
            })
        })

       
  };


// mettre à jour un evenement
exports.update = async (req, res) => {
    const body = req.file ?
    {
      ...JSON.parse(req.body),
      // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

      console.log(body,"body")
    Evenement.updateOne({ _id: req.params.id }, { ...body, _id: req.params.id })
    .then(() => {
        return res.status(200).json({
            success: true,
            message: 'evenement mise à jour !',
        })
    })
    .catch(error => res.status(400).json({ error }));



//     await Evenement.findOne({ _id: req.params.id }, (err, evenement) => {
//       if (err) {
//           return res.status(404).json({
//               err,
//               message: 'aucun evenement trouvé !',
//           })
//       }
//       console.log(evenement,"evene")
//       console.log(body,"body")
//       evenement.titre = body.titre
//       evenement.description = body.description,
//       evenement.pays = body.pays
//       evenement.ville = body.ville,
//       evenement.video = body.video,
//       evenement.photo = body.photo,
//       evenement.date_debut = body.date_debut
//       evenement.heure_debut = body.heure_debut
//       evenement.date_fin = body.date_fin,
//       evenement.heure_fin = body.heure_fin,
//       evenement.chronogramme = JSON.parse(body.chronogramme),
//       evenement.updatingby = body.updatingby,

//       evenement
//           .save()
//           .then(() => {
//               return res.status(200).json({
//                   success: true,
//                   id: evenement._id,
//                   message: 'evenement mise à jour !',
//               })
//           })
//           .catch(error => {
//               return res.status(404).json({
//                   error,
//                   message: 'evenement non mis à jour!',
//               })
//           })
//   })

}


// supprimer un evenement
exports.deleteOne = async (req, res) => {
  
  await Evenement.findOneAndDelete({ _id: req.params.id }, (err, evenement) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!evenement) {
          return res
              .status(404)
              .json({ success: false, error: `aucun evenement trouvé` })
      }

      return res.status(200).json({ success: true, data: evenement })
  }).catch(err => console.log(err))
}


// obtenir un evenement
exports.getOne = async (req, res) => {
  await Evenement.findOne({ _id: req.params.id }, (err, evenement) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!evenement) {
          return res
              .status(404)
              .json({ success: false, error: `aucun evenement trouvé` })
      }
      return res.status(200).json({ success: true, data: evenement })
  }).catch(err => console.log(err))
}


// obtenir tous les evenement
exports.getAll = async (req, res) => {
  await Evenement.find({}, (err, evenement) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!evenement.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun evenement trouvé` })
      }
      return res.status(200).json({ success: true, data: evenement })
  }).catch(err => console.log(err))
}





// ajout d'un nouveau participant a levenement
exports.addParticipant = async (req, res) => {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Evenement.findOne({ _id: req.params.id }, (err, evenement) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun evenement trouvé !',
          })
      }

      if(body.type_compte === "entreprise"){
        Administrateur.findOne({ utilisateur: body.participant }, (err, administrateur) => {

            evenement.participants.push({
                participant: administrateur.entreprise,
                type_compte: body.type_compte
            })


            evenement
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: evenement._id,
                    message: 'Participation ajoutée !',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'erreur de participation!',
                })
            })

        })
      }
      else{
        evenement.participants.push(body)
    
        evenement
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: evenement._id,
                    message: 'Participation ajoutée !',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'erreur de participation!',
                })
            })
    

      }


     
  })

}



// supprimer participation
exports.deleteParticipant = async (req, res) => {
    const body = req.body;

    await Evenement.findOne({ _id: req.params.id }, (err, evenement) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!evenement) {
            return res
                .status(404)
                .json({ success: false, error: `aucun evenement trouvé` })
        }
  
        var objectId =  evenement.participants.find( element =>`${ element.participant}` === body.participant)

        
        evenement.participants.pull({_id:objectId._id})
   
        evenement
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: evenement._id,
                    message: 'Participation supprimée !',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'erreur de participation!',
                })
            })
    

    }).catch(err => console.log(err))
  }