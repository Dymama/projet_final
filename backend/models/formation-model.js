const mongoose = require('mongoose');
const Schema = mongoose.Schema;
       
var formationSchema = new Schema(
    {
        theme: { type: String, required: true },
        description: { type: String, required: true },
        // pays: { type: String, required: true },
        // ville: { type: String, required: true },
        video: { type: String, required: false },
        image: { type: String, required: false },
        date_debut: { type: String, required: true },
        date_fin: { type: String, required: true },
        heure_debut: { type: String, required: true },
        heure_fin: { type: String, required: true },
        statut: { type: Boolean, required: false ,default:false},
        

        lien: { type: String, required: false },

        employer: { type: Schema.Types.ObjectId,ref:'Utilisateur', required:false },
        entreprise: { type: Schema.Types.ObjectId,ref:'Entreprise', required:false },
        evenement: { type: Schema.Types.ObjectId,ref:'Evenement', required:true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Formation', formationSchema)
