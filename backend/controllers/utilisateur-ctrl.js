const Agenda = require('../models/agenda-model')
const Utilisateur = require('../models/utilisateur-model')
const Administrateur = require('../models/administrateur-model')
const Entreprise = require('../models/entreprise-model')
const Candidat = require('../models/candidat-model')

const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');

// verifier la session d'un user
exports.getLogin = (req,res,next) =>{
  

   Utilisateur.findOne({ _id: req.params.id }, (err, utilisateur) => {
    if (err) {
        return res.status(400).json({ success: false, error: err })
    }

    if (!utilisateur) {
        return res
            .status(404)
            .json({ success: false, error: `aucun utilisateur trouvé` })
    }

    if(utilisateur.type_compte === "entreprise"){


      Administrateur.findOne({ utilisateur: utilisateur._id }, (err, administrateur) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!administrateur) {
            return res
                .status(404)
                .json({ success: false, error: `aucun administrateur trouvé` })
        }
        
          Entreprise.findOne({ _id: administrateur.entreprise }, (err, entreprise) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
      
            if (!entreprise) {
                return res
                    .status(404)
                    .json({ success: false, error: `aucun entreprise trouvé` })
            }
      
            return res.status(200).json({ success: true, utilisateur:utilisateur, entreprise: entreprise })
  
          }).catch(err => console.log(err))
        

          return res.status(200).json({ success: true, utilisateur:utilisateur })


      }).catch(err => console.log(err))


    }
    




  }).catch(err => console.log(err))

}


// deconnexion user
exports.logout = (req,res,next) =>{
  const user = req.session.user ;
  if(user){ 
    req.session.destroy()
    res.clearCookie(user)
    console.log('user deconnected success')

    return res.status(201).json({ isLogin:false})
  }
  else return res.status(400).json({message: "erreur"})
}


// inscription
exports.signup = (req, res, next) => {

  // const body = JSON.parse(req.body);
  const body = req.body;
  
  delete body._id;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    // hasher le mot de passe de l'utilisateur
    bcrypt.hash(body.password, 10)
      .then(hash => {

        // creation d'un utilisateur
        const utilisateur = new Utilisateur({
          ...body,
          // admin: true,
          // statut: true,
          password: hash,
          photo: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        });

        //si l'utilisateur n'a pas été bien creer
        if (!utilisateur) {
          return res.status(400).json({ success: false, error: err })
        }

        // sauvegarde de l'utilisateur
        utilisateur.save()
          .then(() => { 
            return res.status(201).json({
            success: true,
            id: utilisateur._id,
            message: 'Utilisateur créé !' 
            })}
            )
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
 


  // connexion
exports.login = (req, res, next) => {

    const body = req.body;
    Utilisateur.findOne({ email: body.email })
      .then(utilisateur => {
        // si l'utilisateur n'a pas été trouvé
        if (!utilisateur) {
          return res.status(401).json({ error: 'Email Introuvable  !' });
        }

        bcrypt.compare(body.password, utilisateur.password)
          .then(valid => {

            // si les mot de passe sont incorects
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
 
    
            const userData = {
              userId: utilisateur._id,
              success:true,
              type:utilisateur.type_compte,
              token: jwt.sign(
                { userId: utilisateur._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
          }

            res.status(200).json(userData);

            // ouverture d'une session pour l'user
            var session = req.session;
            session.user = userData;
            session.save();
            console.log(session)

          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


// mettre à jour un utilisateur
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


  Utilisateur.updateOne({ _id: req.params.id }, { ...body, _id: req.params.id })
  .then(() => {
    return res.status(200).json({
        success: true,
        message: 'utilisateur mise à jour !',
    })
  })
  .catch(error => res.status(400).json({ error }));


  // Utilisateur.findOne({ _id: req.params.id }, (err, utilisateur) => {
  //     if (err) {
  //         return res.status(404).json({
  //             err,
  //             message: 'aucun utilisateur trouvé !',
  //         })
  //     }
      
  //     // utilisateur.nom = body.nom,
  //     // utilisateur.prenom = body.prenom,
  //     // utilisateur.civilite = body.civilite,
  //     // utilisateur.pays = body.pays,
  //     // utilisateur.ville = body.ville,
  //     // utilisateur.secteur = body.secteur,
  //     // utilisateur.telephone = body.telephone,
  //     // utilisateur.linkedin = body.linkedin,
  //     // utilisateur.photo = body.photo,
  //     // utilisateur.statut = body.statut


      
  //     utilisateur
  //         .save()
  //         .then(() => {
  //             return res.status(200).json({
  //                 success: true,
  //                 id: utilisateur._id,
  //                 message: 'utilisateur mise à jour !',
  //             })
  //         })
  //         .catch(error => {
  //             return res.status(404).json({
  //                 error,
  //                 message: 'utilisateur non mis à jour!',
  //             })
  //         })
  // })

}


// supprimer un utilisateur
exports.deleteOne = async (req, res) => {
  
  await Utilisateur.findOneAndDelete({ _id: req.params.id }, (err, utilisateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!utilisateur) {
          return res
              .status(404)
              .json({ success: false, error: `aucun utilisateur trouvé` })
      }

      return res.status(200).json({ success: true, data: utilisateur })
  }).catch(err => console.log(err))
}


// obtenir un utilisateur
exports.getOne = async (req, res) => {
  await Utilisateur.findOne({ _id: req.params.id }, (err, utilisateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!utilisateur) {
          return res
              .status(404)
              .json({ success: false, error: `aucun utilisateur trouvé` })
      }
      return res.status(200).json({ success: true, data: utilisateur })
  }).catch(err => console.log(err))
}


// obtenir tous les utilisateurs
exports.getAll = async (req, res) => {
  await Utilisateur.find({}, (err, utilisateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!utilisateur.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun utilisateur trouvé` })
      }
      return res.status(200).json({ success: true, data: utilisateur })
  }).catch(err => console.log(err))
}



// obtenir un utilisateur entreprise info
exports.getEntrepriseDetail = async (req, res) => {

  await Utilisateur.findOne({ _id: req.params.id }, (err, utilisateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }


      if (!utilisateur) {
          return res
              .status(404)
              .json({ success: false, error: `aucun utilisateur trouvé` })
      }

      
       Administrateur.findOne({ utilisateur: utilisateur._id }, (err, administrateur) => {
          if (err) {
              return res.status(400).json({ success: false, error: err })
          }
    
          if (!administrateur) {
              return res
                  .status(404)
                  .json({ success: false, error: `aucun administrateur trouvé` })
          }
          
            Entreprise.findOne({ _id: administrateur.entreprise }, (err, entreprise) => {
              if (err) {
                  return res.status(400).json({ success: false, error: err })
              }
        
              if (!entreprise) {
                  return res
                      .status(404)
                      .json({ success: false, error: `aucun entreprise trouvé` })
              }
        
              return res.status(200).json({ success: true, data: entreprise })
    
            }).catch(err => console.log(err))
          


        }).catch(err => console.log(err))

  }).catch(err => console.log(err))
}


// information user candidat

exports.getInfoUSerCandidat = async (req, res) => {
console.log('aten')
  await Utilisateur.findOne({ _id: req.params.id }, (err, utilisateur) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!utilisateur) {
          return res
              .status(404)
              .json({ success: false, error: `aucun utilisateur trouvé` })
      }

      Candidat.findOne({utilisateur:utilisateur._id}, (err, candidat) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!candidat) {
            return res
                .status(404)
                .json({ success: false, error: `aucun candidat trouvé` })
        }
        
        return res.status(200).json({ success: true, data: {utilisateur:utilisateur,candidat: candidat} })
      })


  }).catch(err => console.log(err))
}
