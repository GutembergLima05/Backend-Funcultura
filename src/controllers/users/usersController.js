const { msgJson } = require("../../utils/responseJson");
const { knex } = require("../../database/connectionDb");
const { compare, hash } = require("bcrypt");
const { validarCamposObrigatorios } = require("../../utils/util");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { senha } = req.body;
  const { body, dataUnique } = req;
  let fisicoInfo = null;
  let juridicoInfo = null;

  try {
    if (dataUnique && dataUnique.field)
      return msgJson(
        400,
        res,
        `O campo '${dataUnique.field}' já está em uso.`,
        false
      );

    const result = await knex.transaction(async (trx) => {
      body.senha = await hash(senha, 10);
      const [userInfo] = await trx("usuarios")
        .insert({
          email: body.email,
          senha: body.senha,
          tipo_usuario: body.tipo_usuario,
        })
        .returning("*");

      if (body.tipo_usuario === "fisico") {
        const camposParaValidar = ["data_nascimento", "nome_completo", "cpf"];
        const validacao = validarCamposObrigatorios(body, camposParaValidar);
        if (!validacao.valido) {
          throw new Error(validacao.mensagem);
        }
        [fisicoInfo] = await trx("produtores_fisicos")
          .insert({
            id_usuario: userInfo.id_usuario,
            nome_completo: body.nome_completo,
            data_nascimento: body.data_nascimento,
            cpf: body.cpf,
            endereco: body.endereco,
          })
          .returning("*");

        delete fisicoInfo.cpf;
      }

      if (body.tipo_usuario === "juridico") {
        const camposParaValidar = ["razao_social", "cnpj"];
        const validacao = validarCamposObrigatorios(body, camposParaValidar);
        if (!validacao.valido) {
          throw new Error(validacao.mensagem);
        }
        [juridicoInfo] = await trx("produtores_juridicos")
          .insert({
            id_usuario: userInfo.id_usuario,
            razao_social: body.razao_social,
            cnpj: body.cnpj,
            endereco: body.endereco,
            nome_completo: body.nome_completo,
            data_nascimento: body.data_nascimento,
            cpf: body.cpf
          })
          .returning("*");

        delete juridicoInfo.cnpj;
      }

      delete userInfo.senha;
      return { userInfo, fisicoInfo, juridicoInfo };
    });

    msgJson(201, res, result, true);
  } catch (error) {
    console.error(error);
    msgJson(
      400,
      res,
      error.message || "Erro interno do servidor ao cadastrar administrador.",
      false
    );
  }
};

const login = async (req, res) => {
  const { senha } = req.body;
  const { dataUnique } = req;

  try {
    if (!dataUnique)
      return msgJson(404, res, "Email ou senha incorretos!", false);
    const { idObj } = dataUnique;

    const senhaValida = await compare(senha, idObj.senha);
    if (!senhaValida)
      return msgJson(401, res, "Email ou senha incorretos!", false);

    delete idObj.senha;

    const payload = { ...idObj };
    const options = { expiresIn: "12h" };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

    msgJson(200, res, { usuario: idObj, token }, true);
  } catch (error) {
    console.error(error);
    msgJson(500, res, "Erro interno do servidor ao realizar login.", false);
  }
};

module.exports = {
  createUser,
  login,
};
