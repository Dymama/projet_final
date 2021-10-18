const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entretienSchema = new Schema(
    {
        
        type: { type: String, required: true },
        titre: { type: String, required: true },
        description: { type: String, required: true },
        date_debut: { type: Date ,required:true},
        heure_debut: { type: Date ,required:true},
        date_fin: { type: Date ,required:true},
        heure_fin: { type: Date ,required:true},
        statut: { type: Boolean, required: false ,default:false},
        concerner: { type: Schema.Types.ObjectId, required:true },
        lien: { type: String, required: false },

        employer: { type: Schema.Types.ObjectId,ref:'Utilisateur', required:false },
        entreprise: { type: Schema.Types.ObjectId,ref:'Entreprise', required:false },
        collaborateur: { type: Schema.Types.ObjectId,ref:'Utilisateur', required:false },
        
    },
    { timestamps: true },
)

module.exports = mongoose.model('Entretien', entretienSchema)
