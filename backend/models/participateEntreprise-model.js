const mongoose = require('mongoose')
const Schema = mongoose.Schema

const participateEntrepriseSchema = new Schema(
    {
        type: { type: String, required: false ,default:false},
        
        entreprise: { type: Schema.Types.ObjectId,ref:'Entreprise', required:true },
        event: { type: Schema.Types.ObjectId,ref:'Evenement', required:true }


    },
    { timestamps: true },
)

module.exports = mongoose.model('ParticipateEntreprise', participateEntrepriseSchema)
