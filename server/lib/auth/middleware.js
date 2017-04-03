'use strict';

const redisHelper = require('../utility/redis');
const tokenHelper = require('../utility/token');
const config = require('../../config');

/*
 * Middleware to verify the token and store the user data in req._user
 */

exports.isAuthenticated = (rolesRequired) => {

    return function(req, res, next) {

        var headers = req.headers;

        if (headers === null)
            return res.status(401).send('401');

        tokenHelper.extractTokenFromHeader(req, (err, token) => { // Extract Token from header x-access-token
            if (err)
                return res.status(401).send(err);

            redisHelper.getDataByToken(token.decode, (err, data) => {

                if (err)
                    return res.status(401).send('Unauthorized');

                if (token.value !== data.jwt)
                    return res.status(401).send('Unauthorized, token in new device...');

                if (rolesRequired !== undefined)
                    if (!this.hasRole(rolesRequired, data.roles))
                        return res.status(403).send('Rol Unauthorized');

                req.user = data;
                next();
            });
        });
    }
};

/*
 * hasRole
 */

exports.hasRole = (rolesRequired, rolesUser) => {
    //console.log('rolesRequired ',rolesRequired);
    //console.log('rolesUser ',rolesUser);
    var isAuthorized = false;
    rolesRequired.forEach(rolReq => {
        rolesUser.forEach(RolUser => {
            if (rolReq === RolUser) {
                isAuthorized = true;
            }
        });
    });

    return isAuthorized;
};
