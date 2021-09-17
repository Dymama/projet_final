const mongoose = require('mongoose');
const Schema = mongoose.Schema;
       
var formationSchema = new Schema(
    {
        titre: { type: String, required: true },
        description: { type: String, required: true },
        pays: { type: String, required: true },
        ville: { type: String, required: true },
        video: { type: String, required: true },
        image: { type: String, required: true },
        date_debut: { type: String, required: true },
        date_fin: { type: String, required: true },
        statut: { type: Boolean, required: false ,default:false},
        
        entreprise: { type: Schema.Types.ObjectId,ref:'Entreprise', required:true },
        event: { type: Schema.Types.ObjectId,ref:'Evenement', required:true }

    },
    { timestamps: true },
)

module.exports = mongoose.model('Formation', formationSchema)
