const { Router } = require("express");
const { validateEntry, uniqueField } = require("../../middlewares/middleware");
const { s_login, s_createUser } = require("../../schemas/schema");
const user = require('../../controllers/users/usersController')

const routeUser = Router();

routeUser.route('/user/create').post(validateEntry(s_createUser, 'body'), uniqueField('usuarios', ['email'], 'body'), uniqueField('produtores_fisicos', ['cpf'], 'body'), user.createUser);

routeUser.route('/login').post(validateEntry(s_login, 'body'), uniqueField('usuarios', ['email'], 'body'), user.login);

module.exports= {
    routeUser
}