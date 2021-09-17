const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
var helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const nodemailer = require("nodemailer");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

// middlewares
const auth = require('./middleware/auth');
const multer = require('./middleware/multer-config');


// importation des routers
const movieRouter = require('./routes/movie-router')
const userRoutes = require('./routes/utilisateur-router');
const administrateurRoutes = require('./routes/administrateur-router');
const agendaRoutes = require('./routes/agenda-router');
const candidatRoutes = require('./routes/candidat-router');
const conferenceRoutes = require('./routes/conference-router');
const conferencierRoutes = require('./routes/conferencier-router');
const entrepriseRoutes = require('./routes/entreprise-router');
const entretienRoutes = require('./routes/entretien-router');
const invitationRoutes = require('./routes/invitation-router');
const evenementRoutes = require('./routes/evenement-router');
const formateurRoutes = require('./routes/formateur-router');
const formationRoutes = require('./routes/formation-router');
const participateEventRoutes = require('./routes/participateEvent-router');
const participateConferenceRoutes = require('./routes/participateConference-router');
const participateEntrepriseRoutes = require('./routes/participateEntreprise-router');
const participateFormationRoutes = require('./routes/participateFormation-router');
const posteRoutes = require('./routes/poste-router');
const postulerRoutes = require('./routes/postuler-router');
const standRoutes = require('./routes/stand-router');



// configurations
const port = parseInt(process.env.PORT) || 5000;
var expiryDate = new Date( Date.now() + 24*60 * 60 * 1000 ); // 1 hour
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET","POST","DELETE","PUT","PATCH"],
  credentials:true
}));
// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(session({
  name: "userId",
  secret: 'keyboardsecretazer12t3y5gf5d4ghb8htc5b2@gjbdfhis',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: expiryDate }
}))
app.use(helmet());
app.disable('x-powered-by');
app.use(cookieParser())



// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     type: "OAuth2",
//     user: process.env.EMAIL,
//     pass: process.env.WORD,
//     clientId: process.env.OAUTH_CLIENTID,
//     clientSecret: process.env.OAUTH_CLIENT_SECRET,
//     refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//   },
//  });



// utilisation des routes
app.use('/api', movieRouter);
app.use('/utilisateur', userRoutes);
app.use('/administrateur', administrateurRoutes);
app.use('/agenda', agendaRoutes);
app.use('/candidat', candidatRoutes);
app.use('/conference', conferenceRoutes);
app.use('/conferencier', conferencierRoutes);
app.use('/entreprise', entrepriseRoutes);
app.use('/entretien', entretienRoutes);
app.use('/invitation', invitationRoutes);
app.use('/evenement', evenementRoutes);
app.use('/formateur', formateurRoutes);
app.use('/formation', formationRoutes);
app.use('/participateevent', participateEventRoutes);
app.use('/participateConference', participateConferenceRoutes);
app.use('/participateEntreprise', participateEntrepriseRoutes);
app.use('/participateFormation', participateFormationRoutes);
app.use('/poste', posteRoutes);
app.use('/postuler', postulerRoutes);
app.use('/stand', standRoutes);


app.get('/api', (req, res) => {
    res.send({message: 'Hello World! vickytho'})
})


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});