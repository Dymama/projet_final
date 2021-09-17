const mongoose = require('mongoose')
const Schema = mongoose.Schema

const participateEventSchema = new Schema(
    {
        
        type_compte: { type: String, required:true },
        participant: { type: Schema.Types.ObjectId, required:true },
        evenement: { type: Schema.Types.ObjectId,ref:'Evenement', required:true }


    },
    { timestamps: true },
)

module.exports = mongoose.model('ParticipateEvent', participateEventSchema)