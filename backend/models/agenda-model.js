
const mongoose = require('mongoose')
const Schema = mongoose.Schema


var agendaSchema = new Schema(
    {    
        items:[{
            _id            :{ type: String, required: false},
             name          :{ type: String, required: false },
             startDateTime :{ type: Date, required: false },
             endDateTime   :{ type: Date, required: false },
             classes       :{ type: String, required: false },
           }] ,
        selected:[],
        cellHeight:{ type: Number, required: false ,default:30},
        showModal:{ type: Boolean, required: false,default:false },
        locale:{ type: String, required: false ,default: "fr"},
        rowsPerHour:{ type: Number, required: false ,default:2},
        numberOfDays:{ type: Number, required: false ,default:4},


        type_compte:{ type: String, required: true },
        proprietaire: { type: Schema.Types.ObjectId, required:true }

    },
    { timestamps: true },
)

module.exports = mongoose.model('Agenda', agendaSchema)
