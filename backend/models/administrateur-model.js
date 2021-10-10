const mongoose = require('mongoose')
const Schema = mongoose.Schema

const administrateurSchema = new Schema(
    {
        statut: { type: Boolean, required: false ,default:false},
        role: { type: String,required: false },
        entreprise:{type: Schema.Types.ObjectId,ref:'Entreprise'},
        utilisateur:{type: Schema.Types.ObjectId,ref:'Utilisateur'}


    },
    { timestamps: true },
)

module.exports = mongoose.model('Administrateur', administrateurSchema)
