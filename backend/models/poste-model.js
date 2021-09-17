const mongoose = require('mongoose')
const Schema = mongoose.Schema

const posteSchema = new Schema(
    {
        titre: { type: String, required: true },
        description: { type: String, required: true },
        pays: { type: String, required: true },
        ville: { type: String, required: true },
        type_emplois: { type: String, required: true },
        statut: { type: Boolean, required: false ,default:false},
        
        entreprise: { type: Schema.Types.ObjectId,ref:'Entreprise', required:false },
        employer: { type: Schema.Types.ObjectId,ref:'Utilisateur', required:false },
        evenement: { type: Schema.Types.ObjectId,ref:'Evenement', required:false },

        postulants: [{ 
            postulant:{type: Schema.Types.ObjectId, required:false},
            type_compte:{type: String, required:false},
         }],


    },
    { timestamps: true },
)

module.exports = mongoose.model('Poste', posteSchema)
