const { msgError, msgJson } = require("../utils/responseJson.js");
const { knex } = require('../database/connectionDb.js');
const jwt = require('jsonwebtoken');

const validateEntry = (schema, source = 'body') => async (req, res, next) => {
    try {
        const dataToValidate = source === 'params' ? req.params :
                                source === 'query' ? req.query : req.body;
        await schema.validateAsync(dataToValidate);
        next();
    } catch (error) {
        const { details: [{ type, context: { key } }] } = error;
        return msgJson(400, res, msgError[type].replace('$', key), false);
    }
};

const validateTokenAndRole = (rolesConfig) => async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return msgJson(400, res, 'Informe o token.', false);

    const token = authorization.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userRole = decodedToken.cargo;
        
        if (!rolesConfig[userRole]) {
            return msgJson(403, res, 'Acesso negado. Você não tem permissão para realizar esta ação.', false);
        }

        const { table, idField } = rolesConfig[userRole];
        const userId = decodedToken[idField];

        const user = await knex(table).where({ [idField]: userId }).first();

        if (!user) return msgJson(404, res, 'Usuário não encontrado.', false);
        delete user.senha;
        delete user.resetcode;

        req.usuarioLogado = { ...user };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return msgJson(401, res, 'Token expirado. Faça login novamente.', false);
        }
        if(error.name === 'JsonWebTokenError'){
            return msgJson(401, res, 'Token mal formado ou inválido!', false)
        }
        console.log(error)
        return msgJson(401, res, 'Não autorizado.', false);
    }
};

const uniqueField = (table, fields, path, nameObj = 'dataUnique') => async (req, res, next) => {
    try {
        const whereConditions = fields.map(field => ({ [field]: req[path][field] }));

        const results = await knex(table).where(builder => {
            whereConditions.forEach(condition => {
                builder.orWhere(condition);
            });
        });

        if (results.length > 0) {
            const duplicateField = fields.find(field => results[0][field] === req[path][field]);

            req[nameObj] = {
                idObj: results[0],
                field: duplicateField
            };
        }
        next();
    } catch (error) {
        console.log(error)
        msgJson(500, res, 'Erro interno no servidor ao validar campos únicos', false);
    }
};

module.exports = {
    validateEntry,
    validateTokenAndRole,
    uniqueField
}