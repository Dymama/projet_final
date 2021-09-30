const mongoose = require('mongoose')
const Schema = mongoose.Schema
       
var conferenceSchema = new Schema(
    {
      
        description: { type: String, required: true },
        theme: { type: String, required: true },
        // pays: { type: String, required: true },
        // ville: { type: String, required: true },
        // video: { type: String, required: true },
        // image: { type: String, required: true },
        heure_debut: { type: String, required: true },
        date_debut: { type: String, required: true },
        date_fin: { type: String, required: true },
        heure_fin: { type: String, required: true },
        nb_participant: { type: Number, required: false},
        password: { type: String, required: false},
        statut: { type: Boolean, required: false ,default:false},

        employer: { type: Schema.Types.ObjectId,ref:'Utilisateur', required:false },
        entreprise: { type: Schema.Types.ObjectId,ref:'Entreprise', required:false },
        evenement: { type: Schema.Types.ObjectId,ref:'Evenement', required:true }

    },
    { timestamps: true },
)

module.exports = mongoose.model('Conference', conferenceSchema)
