const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator');



const utilisateurSchema = new Schema(
    {
        
        type_compte: { type: String, required: true },

        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        date_naissance: { type: Date, required: true },
        civilite: { type: String, required: true },
        pays: { type: String, required: true },
        ville: { type: String, required: true },
        telephone: { type: String, required: true },
        linkedin: { type: String, required: false },
        photo: { type: String, required: false },


        statut: { type: Boolean, required: false ,default:false},

        admin: { type: Boolean, required: false ,default:false},
        
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        
    },
    { timestamps: true },
)

//s'assurera qu'aucun des utilisateurs ne peut partager la même adresse e-mail.
utilisateurSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Utilisateur', utilisateurSchema)
