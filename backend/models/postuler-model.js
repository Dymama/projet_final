const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postulerSchema = new Schema(
    {
        candidat: { type: Schema.Types.ObjectId,ref:'Candidat', required:true },
        poste: { type: Schema.Types.ObjectId,ref:'Poste', required:true }


    },
    { timestamps: true },
)

module.exports = mongoose.model('Postuler', postulerSchema)
