const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entrepriseSchema = new Schema(
    {
        nom: { type: String, required: true },
        adresse: { type: String, required: true },
        description: { type: String, required: true },
        pays: { type: String, required: true },
        ville: { type: String, required: true },
        secteur: { type: String, required: true },
        telephone: { type: String, required: true },
        photo: { type: String, required: false },
        site_internet: { type: String, required: false},
        linkedin: { type: String, required: false },
        facebook: { type: String, required: false },
        video: { type: String, required: false },
        statut: { type: Boolean, required: false ,default:false},

        email: { type: String, required: true },

    },
    { timestamps: true },
)

module.exports = mongoose.model('Entreprise', entrepriseSchema)
