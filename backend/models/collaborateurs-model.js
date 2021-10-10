const mongoose = require('mongoose')
const Schema = mongoose.Schema

var collaborateurSchema = new Schema(
    {        
        
      
        niveau_etude: { type: String, required: true },
        cv: { type: String, required: true },
        annee_experience: { type: String, required: true },
        poste_actuel: { type: String, required: true },
        salaire_actuel: { type: String, required: true },
        point_fort: { type: String, required: true },
        point_faible: { type: String, required: true },

        utilisateur:{type: Schema.Types.ObjectId,ref:'Utilisateur'}

        
    },
    { timestamps: true },
)

module.exports = mongoose.model('Collaborateurs', collaborateurSchema)
