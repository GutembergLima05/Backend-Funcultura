const Joi = require('joi');

const criaObjJoi = (camposJoiObj) => Joi.object().keys(camposJoiObj).required(),
    key = Joi.string().valid(`${process.env.KEYAPI}`).required(),
    id = Joi.number().integer().positive().required(),
    email = Joi.string().email().required(),
    senha = Joi.string().min(8).max(72).required(),
    nome_completo = Joi.string().min(8).max(255).required(),
    data_nascimento = Joi.date().iso().required(),
    cpf = Joi.string().min(11).max(11),
    endereco = Joi.string().required(),
    razao_social = Joi.string().min(5).max(255),
    cnpj = Joi.string().min(14).max(14),
    tipo_usuario = Joi.string().valid("juridico", "fisico", "admin")

module.exports = {
    s_idCheck: criaObjJoi({ id }),
    s_login: criaObjJoi({ email, senha, key }),
    s_createUser: criaObjJoi({ nome_completo, email, senha, tipo_usuario, data_nascimento, cpf, cnpj, razao_social, endereco })
} 
