const mongoose = require('mongoose')
const Schema = mongoose.Schema

const participateFormationSchema = new Schema(
    {
        type: { type: String, required: false ,default:false},
        formateur: { type: Schema.Types.ObjectId,ref:'Formateur', required:true },
        formation: { type: Schema.Types.ObjectId,ref:'Formation', required:true }


    },
    { timestamps: true },
)

module.exports = mongoose.model('ParticipateFormation', participateFormationSchema)
