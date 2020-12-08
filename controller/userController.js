const bcrypt = require('bcrypt');
let Users = require('../model/Users')
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) => {
    let {username, email, password, displayname, avatar} = req.body

    try {
        let usernameTemp = await Users.find({username})
        let emailTemp = await Users.find({email})

        if (usernameTemp.length > 0){
            res.send({
                "message": `username already exist please try another name`,
                "status": false
            })
        } else if (emailTemp.length > 0){
            res.send({
                "message": `email already exsit. please try log in or try forgot your password`,
                "status": false
            })
        } else{
            const hashPassword = await bcrypt.hashSync(password, 10);
            let user = await Users.create({username, email, "password": hashPassword, displayname, avatar})
            if (user){
                let jsonToken = await jwt.sign(user.unique_id, process.env.JSON_TOKEN);
                let finalData = {
                    "username": user.username,
                    "email": user.email,
                    "displayname": user.displayname,
                    "avatar": user.avatar,
                    "unique_id": user.unique_id,
                    "jsonToken": jsonToken
                }

                res.send({
                    "message": `user created successfully`,
                    "status": true,
                    "user": finalData
                })
            }
        }
    } catch (error) {
        console.log("error", error)
        res.send({
            "message": `there was an error while creating user`,
            "status": false,
            "error": error
        })
    }
}

module.exports.logInUser = async (req, res) => {
    let {username, password} = req.body

    try {
        let user = await Users.find({username})
        if (user.length > 0){
            let decryptPass = await bcrypt.compareSync(password, user[0].password);
            if(decryptPass){

                let key = process.env.JSON_TOKEN
                let jsonToken = await jwt.sign(user[0].unique_id, key);
                let finalData = {
                    "username": user[0].username,
                    "email": user[0].email,
                    "displayname": user[0].displayname,
                    "avatar": user[0].avatar,
                    "unique_id": user[0].unique_id,
                    "jsonToken": jsonToken
                }
                res.send({
                    "message": "logIn successfully",
                    "status": true,
                    "error": null,
                    "user": finalData
                })
            } else{
                res.send({
                    "message": `credentials mismatched please try again`,
                    "status": false,
                    "error": null,
                    "user": null
                })
            }
        } else {
            res.send({
                "message": `username not found`,
                "status": false,
                "error": null,
                "user": null
            })
        }
    } catch (error) {
        console.log("error", error)
        res.send({
            "message": `error found... please provide valid credentials`,
            "status": false,
            "error": error,
            "user": null
        })
    }
}

module.exports.findUserName = async (req, res) => {
    let username = req.body.username

    try {
        let user = await Users.find({username})
        if(user.length > 0){
            res.send({
                "message": "I am sorry the user name already exsits. please try something unique",
                "status": false
            })
        }else{
            res.send({
                "message": `nice user name. I love it`,
                "status": true
            })
        }
    } catch (error) {
        res.send({
            "message": `error found... please provide valid credentials`,
            "status": false,
            "error": error,
        })
    }
}