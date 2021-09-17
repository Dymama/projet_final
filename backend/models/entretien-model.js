const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entretienSchema = new Schema(
    {
        
        type: { type: String, required: true },
        titre: { type: String, required: true },
        description: { type: String, required: true },
        date_debut: { type: Date ,required:true},
        heure_debut: { type: Date ,required:true},
        statut: { type: Boolean, required: false ,default:false},
        concerner: { type: Schema.Types.ObjectId, required:true },

        entreprise_demandeur: { type: Schema.Types.ObjectId,ref:'Utilisateur', required:true },

    },
    { timestamps: true },
)

module.exports = mongoose.model('Entretien', entretienSchema)
