const mongoose = require('mongoose')
const Schema = mongoose.Schema

var formateurSchema = new Schema(
    {    
        utilisateur:{type: Schema.Types.ObjectId,ref:'Utilisateur'}
        

    },
    { timestamps: true },
)

module.exports = mongoose.model('Formateur', formateurSchema)
