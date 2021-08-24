const jwt = require("jsonwebtoken");
//i will be using the email for the payload and will expire automatically in 3600

// production secrete key generator
/************************************************************
// require('crypto').randomBytes(32, function(err, buffer) {
//     var ACCESS_TOKEN_SECRET = buffer.toString('hex');
//     });

*************************************************************/

// exports.genereteToken =(req,next)=> {
//   const token = jwt.sign(req.body.phoneNumber, process.env.SECRET_KEY, {
//     expiresIn: 3600,
//   });
//  return token;
// }

// async function verifyToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (authHeader == null)
//     return next({ status: 401, message: "authorization missing" });

//   jwt.verify(authHeader, process.env.SECRET_KEY, (err, user) => {
//     if (err) return next({ status: 403, message: err.message });
//     req.staff = staff;
//     next();
//   });
// }

// Authentication = {  verifyToken };

// module.exports = Authentication;
