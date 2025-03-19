function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function validarCamposObrigatorios(body, camposObrigatorios) {
    for (const campo of camposObrigatorios) {
        if (!body[campo]) {
            return { valido: false, mensagem: `O campo '${campo}' é obrigatório.` };
        }
    }
    return { valido: true };
}


module.exports = {
    formatarCPF,
    formatarCNPJ,
    validarCamposObrigatorios
}