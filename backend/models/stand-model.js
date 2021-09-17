const mongoose = require('mongoose')
const Schema = mongoose.Schema

const standSchema = new Schema(
    {
        image: { type: String, required: true },
        video: { type: String, required: true },
        statut: { type: Boolean, required: false ,default:false},
        
        entreprise: { type: Schema.Types.ObjectId,ref:'Entreprise', required:true },
        event: { type: Schema.Types.ObjectId,ref:'Evenement', required:true }


    },
    { timestamps: true },
)

module.exports = mongoose.model('Stand', standSchema)
