const mongoose = require('mongoose')
const Schema = mongoose.Schema

var conferencierSchema = new Schema(
    {    
        utilisateur:{type: Schema.Types.ObjectId,ref:'Utilisateur'}

    },
    { timestamps: true },
)

module.exports = mongoose.model('Conferencier', conferencierSchema)
