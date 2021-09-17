const ParticipateEvent = require('../models/participateEvent-model')
const Agenda = require('../models/agenda-model')
var mongoose = require('mongoose');



// creer un ParticipateEvent
exports.create = (req, res, next) => {

    
  const body = req.body;

  console.log(body,'evenement participate')
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }
    
    const participateEvent = new ParticipateEvent(body)

    if (!participateEvent) {
        return res.status(400).json({ success: false, error: err })
    }

    participateEvent
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: participateEvent._id,
                message: 'participateEvent creer!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'participateEvent non creer!',
            })
        })

       
  };


// mettre à jour un participateEvent
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    ParticipateEvent.findOne({ _id: req.params.id }, (err, participateEvent) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'aucun participateEvent trouvé !',
          })
      }
      
      participateEvent.type_compte = body.type_compte,
      participateEvent.participant = body.participant,
      participateEvent.evenement = body.evenement
      
      participateEvent
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: participateEvent._id,
                  message: 'participateEvent mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'participateEvent non mis à jour!',
              })
          })
  })

}


// supprimer un participateEvent
exports.deleteOne = async (req, res) => {
  
  await ParticipateEvent.findOneAndDelete({ _id: req.params.id }, (err, participateEvent) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!participateEvent) {
          return res
              .status(404)
              .json({ success: false, error: `aucun participateEvent trouvé` })
      }

      return res.status(200).json({ success: true, data: participateEvent })
  }).catch(err => console.log(err))
}


// obtenir un participateEvent
exports.getOne = async (req, res) => {
  await ParticipateEvent.findOne({ _id: req.params.id }, (err, participateEvent) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!participateEvent) {
          return res
              .status(404)
              .json({ success: false, error: `aucun participateEvent trouvé` })
      }
      return res.status(200).json({ success: true, data: participateEvent })
  }).catch(err => console.log(err))
}


// obtenir tous les participateEvent
exports.getAll = async (req, res) => {
  await ParticipateEvent.find({}, (err, participateEvent) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!participateEvent.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun participateEvent trouvé` })
      }
      return res.status(200).json({ success: true, data: participateEvent })
  }).catch(err => console.log(err))
}




// obtenir un participateEvent
exports.participateVerify = async (req, res) => {

    const body = req.body

    await ParticipateEvent.findOne({ participant: mongoose.Types.ObjectId(body.participant), evenement:mongoose.Types.ObjectId(body.evenement) }, (err, participateEvent) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!participateEvent) {
            return res
                .status(404)
                .json({ success: false, error: `aucun participateEvent trouvé` })
        }
        return res.status(200).json({ success: true, id: participateEvent._id })
    }).catch(err => console.log(err))
  }
  