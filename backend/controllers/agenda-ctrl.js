const Agenda = require('../models/agenda-model')
const Administrateur = require('../models/administrateur-model')
const { v4: uuidv4 } = require('uuid');


// creer un Agenda
exports.create = (req, res, next) => {

  const body = req.body;
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const agenda = new Agenda(body)

    if (!agenda) {
        return res.status(400).json({ success: false, error: err })
    }

    agenda
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: agenda._id,
                message: 'agenda creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'agenda non creer!',
            })
        })

       
  };


// mettre à jour un agenda
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Agenda.findOne({ _id: req.params.id }, (err, agenda) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun agenda trouvé !',
          })
      }
      
    //   administrateur.utilisateur = body.utilisateur,
    //   administrateur.entreprise = body.entreprise,
    //   administrateur.role = body.role,
    //   administrateur.statut = body.statut
      
    agenda
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: agenda._id,
                  message: 'agenda mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'agenda non mis à jour!',
              })
          })
  })

}


// supprimer un agenda
exports.deleteOne = async (req, res) => {
  
  await Agenda.findOneAndDelete({ _id: req.params.id }, (err, agenda) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!agenda) {
          return res
              .status(404)
              .json({ success: false, error: `aucun agenda trouvé` })
      }

      return res.status(200).json({ success: true, data: agenda })
  }).catch(err => console.log(err))
}


// obtenir un agenda
exports.getOne = async (req, res) => {
  await Agenda.findOne({ _id: req.params.id }, (err, agenda) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!agenda) {
          return res
              .status(404)
              .json({ success: false, error: `aucun agenda trouvé` })
      }
      return res.status(200).json({ success: true, data: agenda })
  }).catch(err => console.log(err))
}


// obtenir un agenda par proprietaire
exports.getByProp = (req, res) => {
   
             Agenda.findOne({proprietaire: req.params.id }, (err, agenda) => {
                  if (err) {
                      return res.status(400).json({ success: false, error: err })
                  }
            
                  if (!agenda) {
                      return res
                          .status(404)
                          .json({ success: false, error: `aucun agenda trouvé` })
                  }
                  
                  return res.status(200).json({ success: true, data: agenda })
              }).catch(err => console.log(err))
    

}


// obtenir tous les agenda
exports.getAll = async (req, res) => {
  await Agenda.find({}, (err, agenda) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!agenda.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun agenda trouvé` })
      }
      return res.status(200).json({ success: true, data: agenda })
  }).catch(err => console.log(err))
}





  
// mettre à jour un agenda
exports.addEvent = async (req, res) => {
    const body = req.body
    console.log(body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Agenda.findOne({ proprietaire: req.params.id }, (err, agenda) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun agenda trouvé !',
          })
      }


      var agendaData = {
        _id            : uuidv4() ,
         name          : body.name,
         startDateTime : body.startDateTime,
         endDateTime   : body.startDateTime,
         classes       : body.color
       }

       agenda.items.push(agendaData);

       console.log(agenda,'aeg')
    agenda
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: agenda._id,
                  message: 'agenda mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'agenda non mis à jour!',
              })
          })
  })

}
