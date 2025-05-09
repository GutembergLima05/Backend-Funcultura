const { Router } = require("express");
const { validateEntry } = require("../../middlewares/middleware");
const { upload, handleMulterError } = require('../../config/multer');
const documentos = require("../../controllers/cadastro/cadastroController");
const {
  validarDocumentosPF,
  validarDocumentosPJ,
} = require("../../utils/util");

const routeDocumentos = Router();

// Campos para upload PF
const uploadFieldsPF = [
  { name: "documentoIdentidade", maxCount: 1 },
  { name: "cpf", maxCount: 1 },
  { name: "comprovanteResidencia", maxCount: 1 },
  { name: "curriculo", maxCount: 1 },
  { name: "certidaoRegularidade", maxCount: 1 },
  { name: "certidaoFuncultura", maxCount: 1 },
];

// Campos para upload PJ
const uploadFieldsPJ = [
  { name: "contratoSocial", maxCount: 1 },
  { name: "comprovanteEnderecoAtual", maxCount: 1 },
  { name: "comprovanteEnderecoAntigo", maxCount: 1 },
  { name: "curriculoEmpresa", maxCount: 1 },
  { name: "certidaoRegularidade", maxCount: 1 },
  { name: "certidaoFuncultura", maxCount: 1 },
  { name: "cnpj", maxCount: 1 },
];

// Rotas para upload de documentos
routeDocumentos
  .route("/documentos/upload-pf")
  .post(
    upload.fields(uploadFieldsPF),
    handleMulterError,
    validarDocumentosPF,
    documentos.uploadDocumentosPF
  );

routeDocumentos
  .route("/documentos/upload-pj")
  .post(
    upload.fields(uploadFieldsPJ),
    handleMulterError,
    validarDocumentosPJ,
    documentos.uploadDocumentosPJ
  );

// Rotas para renovação de documentos
routeDocumentos.route("/documentos/renovacao-pf").post(
  upload.fields([
    { name: "comprovanteResidencia", maxCount: 1 },
    { name: "certidaoRegularidade", maxCount: 1 },
    { name: "certidaoFuncultura", maxCount: 1 },
    { name: "curriculo", maxCount: 1 },
  ]),
  handleMulterError,
  validarDocumentosPF,
  documentos.renovacaoPF
);

routeDocumentos.route("/documentos/renovacao-pj").post(
  upload.fields([
    { name: "comprovanteEndereco", maxCount: 1 },
    { name: "certidaoRegularidade", maxCount: 1 },
    { name: "certidaoFuncultura", maxCount: 1 },
    { name: "cnpj", maxCount: 1 },
    { name: "contratoSocial", maxCount: 1 },
  ]),
  handleMulterError,
  validarDocumentosPJ,
  documentos.renovacaoPJ
);

// Rota para buscar documentos
routeDocumentos.route("/documentos/:id_usuario").get(documentos.getDocumentos);

module.exports = {
  routeDocumentos,
};
