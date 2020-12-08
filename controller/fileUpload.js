var path = require('path')
var fs = require('fs');


module.exports.upload = async (req, res) => {
        var  currentUnixTime= Date.now();
    try {
        var f = currentUnixTime+'_' + req.file.originalname;
        var dest = path.resolve('./public/uploads', f);
        fs.rename(req.file.path, dest, (err)=>{
          if(err) throw err;
          else {
              res.json({file: `image/${f}`});
          }
        });

    } catch(err){
        console.log("ERROR", err)
        res.status(422).json({err});
    }
}