const mongoose = require('mongoose')
const Schema = mongoose.Schema

const participateConferenceSchema = new Schema(
    {
        type: { type: String, required: false ,default:false},
        conferencier: { type: Schema.Types.ObjectId,ref:'Conferencier', required:true },
        conference: { type: Schema.Types.ObjectId,ref:'Conference', required:true }


    },
    { timestamps: true },
)

module.exports = mongoose.model('ParticipateConference', participateConferenceSchema)
