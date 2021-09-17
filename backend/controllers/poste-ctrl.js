const Poste = require('../models/poste-model')
const Utilisateur = require('../models/utilisateur-model')
const Administrateur = require('../models/administrateur-model')
const Entreprise = require('../models/entreprise-model')


// creer un Poste
exports.create = (req, res, next) => {

    const body = req.body;
    const userSession =  req.session.user;
    
    console.log(body,'poste')
    console.log(userSession,'user')
    // verifer si la session existe toujours

    if(!userSession){
        return res.status(400).json({
            success: false,
            error: 'user non authentifié',
        })
    
        
    }

    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    // verification administrateur
    Administrateur.findOne({utilisateur: userSession.userId})
        .then( admin => {
            if (!admin) {
                return res.status(401).json({ error: 'administrateur non trouvé !' });
              }

                    // poste container 
                    const poste = new Poste({
                        ...body,
                        employer: admin.utilisateur,
                        entreprise:admin.entreprise
        
                        })
                
                    if (!poste) {
                        return res.status(400).json({ success: false, error: err })
                    }
                
                    poste
                        .save()
                        .then(() => {
                            return res.status(201).json({
                                success: true,
                                id: poste._id,
                                message: 'poste crée!',
                            })

                            console.log(poste)
                        })
                        .catch(error => {
                            return res.status(400).json({
                                error,
                                message: 'poste non crée!',
                            })
                        }) 
                            
            





            // verification de l'entreprise
            // Entreprise.findOne({utilisateur: userSession.userId})
            //     .then( entreprise => {
            //         if (!entreprise) {
            //             return res.status(401).json({ error: 'entreprise non trouvé !' });
            //         }
    
            //         // poste container 
            //         const poste = new Poste({
            //             ...body,
            //             administrateur: admin._id,
            //             entreprise: entreprise
        

            //             })
                
            //         if (!poste) {
            //             return res.status(400).json({ success: false, error: err })
            //         }
                
            //         poste
            //             .save()
            //             .then(() => {
            //                 return res.status(201).json({
            //                     success: true,
            //                     id: poste._id,
            //                     message: 'poste crée!',
            //                 })
            //             })
            //             .catch(error => {
            //                 return res.status(400).json({
            //                     error,
            //                     message: 'poste non crée!',
            //                 })
            //             }) 
                            
            //     })
                    
            //     .catch(error => {
            //             return res.status(400).json({
            //                 error,
            //                 message: 'poste non crée!',
            //             })
            //     })     
            //     // end verification entreprise

               

        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Administrateur non trouvé!',
            })
        })
        //end verification admin

       
  };


// mettre à jour un poste
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Poste.findOne({ _id: req.params.id }, (err, poste) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun poste trouvé !',
          })
      }
      
      poste.titre = body.titre,
      poste.description = body.description,
      poste.pays = body.pays
      poste.ville = body.ville,
      poste.type_emplois = body.type_emplois,
      poste.statut = body.statut,
      poste.entreprise = body.entreprise
      poste.event = body.event

      poste
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: poste._id,
                  message: 'poste mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'poste non mis à jour!',
              })
          })
  })

}


// supprimer un poste
exports.deleteOne = async (req, res) => {
  
  await Poste.findOneAndDelete({ _id: req.params.id }, (err, poste) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!poste) {
          return res
              .status(404)
              .json({ success: false, error: `aucun poste trouvé` })
      }

      return res.status(200).json({ success: true, data: poste })
  }).catch(err => console.log(err))
}


// obtenir un poste
exports.getOne = async (req, res) => {
  await Poste.findOne({ _id: req.params.id }, (err, poste) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!poste) {
          return res
              .status(404)
              .json({ success: false, error: `aucun poste trouvé` })
      }
      return res.status(200).json({ success: true, data: poste })
  }).catch(err => console.log(err))
}


// obtenir tous les poste
exports.getAll = async (req, res) => {
  await Poste.find({}, (err, poste) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!poste.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun poste trouvé` })
      }
      return res.status(200).json({ success: true, data: poste })
  }).catch(err => console.log(err))
}





// ajout d'un nouveau postulant a un poste
exports.addPostulant = async (req, res) => {
    
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    Poste.findOne({ _id: req.params.id }, (err, poste) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun poste trouvé !',
          })
      }


      poste.postulants.push(body)
    
        poste
              .save()
              .then(() => {
                  return res.status(200).json({
                      success: true,
                      id: poste._id,
                      message: 'Postulant ajoutée !',
                  })
              })
              .catch(error => {
                  return res.status(404).json({
                      error,
                      message: 'erreur de poste!',
                  })
              })



    //   if(body.type_compte === "entreprise"){
    //     Administrateur.findOne({ utilisateur: body.participant }, (err, administrateur) => {

    //         evenement.participants.push({
    //             participant: administrateur.entreprise,
    //             type_compte: body.type_compte
    //         })


    //         evenement
    //         .save()
    //         .then(() => {
    //             return res.status(200).json({
    //                 success: true,
    //                 id: evenement._id,
    //                 message: 'Participation ajoutée !',
    //             })
    //         })
    //         .catch(error => {
    //             return res.status(404).json({
    //                 error,
    //                 message: 'erreur de participation!',
    //             })
    //         })

    //     })
    //   }
    //   else{
    //     evenement.participants.push(body)
    
    //     evenement
    //         .save()
    //         .then(() => {
    //             return res.status(200).json({
    //                 success: true,
    //                 id: evenement._id,
    //                 message: 'Participation ajoutée !',
    //             })
    //         })
    //         .catch(error => {
    //             return res.status(404).json({
    //                 error,
    //                 message: 'erreur de participation!',
    //             })
    //         })
    

    //   }




     
  })

}



// supprimer postulant
exports.deletePostulant = async (req, res) => {
    const body = req.body;
    await Poste.findOne({ _id: req.params.id }, (err, poste) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!poste) {
            return res
                .status(404)
                .json({ success: false, error: `aucun poste trouvé` })
        }
  
        var objectId =  poste.postulants.find( element =>`${ element.postulant}` === body.postulant)

        
        poste.postulants.pull({_id:objectId._id})
   
        poste
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: poste._id,
                    message: 'poste supprimée !',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'erreur de poste!',
                })
            })
    

    }).catch(err => console.log(err))
  }


  


  
// poste ler a un evenement
exports.getEventPoste = async (req, res) => {
    await Poste.find({evenement: req.params.id }, (err, poste) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!poste) {
            return res
                .status(404)
                .json({ success: false, error: `aucun poste trouvé` })
        }
        return res.status(200).json({ success: true, data: poste })
    }).catch(err => console.log(err))
  }
  