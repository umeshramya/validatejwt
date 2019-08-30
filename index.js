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



let createJWTToken = (payload={user, role, inageId, userID}, expiresIn ) => {

    return new Promise ((resolve, reject)=>{
        jwt.sign(payload, SECRETE_KEY, {expiresIn : expiresIn},(err, token)=>{
            if(err){
                reject(err)
            }else{
                resolve(token);
            }
        })


    })

}

let validateAuth = (req, res, next) => {
    let bearerHeader = req.headers['authorization'];
    let bearerToken;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        bearerToken = bearer[1];
    }else if(queryString.parseUrl(req.url).query.token){
        bearerToken = queryString.parseUrl(req.url).query.token;
    }
    
    if (bearerToken) {
        jwt.verify(bearerToken, SECRETKEY, (err, jwtPayload) => {
            if (err) {
                res.status(403).send("Forbidden")
            } else {
                req.jwtPayload = jwtPayload
                // for role permission
                
                let curUrl = `${req.baseUrl}${req.route.path}`;
                let curRole = jwtPayload.role

                req.permission = role.getRoleRoutePrivilegeValue(curRole, curUrl, req.method)
                
                if (req.permission === false) {
                    res.status(403).send("Forbidden")
                } else {
                    next();
                }
            }
        })

    } else {
        res.sendStatus(403);
    }
}



module.exports={
    setSecretKey, createJWTToken, validateAuth
}