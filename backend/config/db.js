const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://"+ process.env.DB_USER_PASS +"@cluster0.2b2mg.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )

  .then(() => {
    console.log("connexion à Mongoose DB effectuée");
  })
  .catch((err) => console.log("erreur connexion Mongoose DB :".err));
