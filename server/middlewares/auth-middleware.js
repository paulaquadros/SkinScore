const Usuario = require('../models/Usuario');
const {expressjwt: jwt} = require('express-jwt');
const secretKey = 'seria_melhor_ir_ver_o_pele';

const authMiddleware = jwt({ secret: secretKey, algorithms: ['HS256'] });

module.exports = authMiddleware;
