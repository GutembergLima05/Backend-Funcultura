const msgJson = (statusCode, objRes, msgJson = undefined, success) => {
    const conteudoJson = !msgJson ? null : typeof msgJson === 'object' ? msgJson : { message: msgJson };
    return objRes.status(statusCode).json({ conteudoJson, success });
};

const msgError = {
    'any.required': `O campo '$' é obrigatório.`,
    'string.max': `O campo '$' ultrapassou o máximo de caracteres.`,
    'string.email': 'Insira um email válido.',
    'string.min': `O campo '$' não possui o mínimo de caracteres.`,
    'string.empty': `O campo '$' não pode estar vazio.`,
    'string.base': `O campo '$' precisa ser uma string.`,
    'string.valid': 'O campo $ possui um valor inválido.',
    'any.only': 'O campo $ precisa conter dados permitidos.',
    'number.integer': `Informe um número inteiro no campo '$'.`,
    'number.positive': `Informe um número positivo no campo '$'.`,
    'number.base': `Informe um número válido no campo '$'.`,
    'object.base': `Informe os campos dentro de chaves '{}'.`,
    'object.unknown': `O campo '$' não é permitido.`,
    'string.isoDate': `O campo '$' precisa ser uma data válida no formato YYYY-MM-ddThh:mm:ss.`,
    'array.base': 'O campo $ precisa ser um array.',
    'array.includesRequiredUnknowns': 'O campo $ contém elementos que não são permitidos.',
    'date.format': 'A data deve estar no formato YYYY-MM-DD.',
    'date.base': 'A data deve ser uma data válida.'
};

module.exports = {
    msgJson,
    msgError
};