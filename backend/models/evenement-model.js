const mongoose = require('mongoose')
const Schema = mongoose.Schema

const evenementSchema = new Schema(
    {
        titre: { type: String, required: true },
        description: { type: String, required: true },
        pays: { type: String, required: true },
        ville: { type: String, required: true },
        video: { type: String, required: false },
        images: { type: Array, required: false},
        date_debut: { type: String, required: true },
        date_fin: { type: String, required: true },
        heure_debut: { type: String, required: true },
        heure_fin: { type: String, required: true },
        statut: { type: Boolean, required: false ,default:false},
        chronogramme: [{}],
        
        createur: { type: Schema.Types.ObjectId,ref:'Utilisateur', required:true },
        updatingby: { type: Schema.Types.ObjectId,ref:'Utilisateur', required:false },
        
        participants: [{ 
                        participant:{type: Schema.Types.ObjectId, required:false},
                        type_compte:{type: String, required:false},
                     }],

        // stands:[{ type: Schema.Types.ObjectId,ref:'Stand', required: false }] ,
        // offres:[{ type: StrSchema.Types.ObjectId,ref:'Poste', required: false }] ,
        // entretiens:[{ type: Schema.Types.ObjectId,ref:'Entretien', required: false }] ,
        // formations:[{ type: Schema.Types.ObjectId,ref:'Formation', required: false }] ,


    },
    { timestamps: true },
)

module.exports = mongoose.model('Evenement', evenementSchema)
