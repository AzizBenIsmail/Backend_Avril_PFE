const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const requireAuthUser = (req, res, next) => {
  
  const token = req.cookies.jwt_token;  //partie 1 postman
  //console.log("token", token); //token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODg5OWI0ZDViODAzM2UxY2M1MTNiMyIsImlhdCI6MTY4Njc1MzQ4NCwiZXhwIjoxNjg2NzYwNjg0fQ.KPnsNPjL0PS3oyZ5l3mMC9GUc0ymgheVr-FYt_31pN0
  
  //const authHeader = req.headers.authorization; //partie2 => non postman
  //const token = authHeader && authHeader.split(" ")[1]; //Partie2
  
  if (token) {
    jwt.verify(token, "net 9antra25 secret", async (err, decodedToken) => {
      if (err) {
        console.log("il ya une erreur au niveau du token", err.message);
        res.json("/Problem_token");
      } else {
        req.user = await userModel.findById(decodedToken.id);
        next();
      }
    });
  } else {
    res.json("/pas_de_token");
  }
};
module.exports = { requireAuthUser };
