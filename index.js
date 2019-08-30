"use strict";
const role = require("user-groups-roles");
const jwt = require("jsonwebtoken");

 let SECRETE_KEY ="";

const setSecretKey = (secreteKey)=>{
    if(SECRETE_KEY === ""){
        SECRETE_KEY = secreteKey;
    }else{
        throw  "can not reset secrete key, because it is already set";
    }
}



let createJWTToken = ({user, role, inageId, userID}, expiresIn ,  res) => {
    jwt.sign({ user, role }, SECRETKEY, { expiresIn: expiresIn }, (err, token) => {

        if (err) {
            res.status(500).send("Invalid Token")
        } else {

            res.status(200).json({
                user: user,
                role: role,
                token: token,
                imageId : imageId,
                message : "Login succusfull"
            })
        }
    })
}






module.exports={
    setSecretKey, createJWTToken
}