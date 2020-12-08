//  Verify Token
const jwt = require('jsonwebtoken');


module.exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.body.token
  if(typeof bearerHeader !== 'undefined') {
    jwt.verify(bearerHeader, process.env.JSON_TOKEN, (err, authData) => {
        if(err) {
          res.send({
            "message": "please verify your token, current one is invalid",
            "status": false
        });
        } else {
            next();
        }
    })
  } else {
    res.send({
        "message": "please provide your token",
        "status": false
    });
  }

}