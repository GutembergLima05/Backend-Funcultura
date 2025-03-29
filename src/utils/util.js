const fs = require('fs').promises;

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

const validarDocumentosPJ = (req, res, next) => {
    // Validar extensões permitidas
    const extensoesPermitidas = ['.pdf', '.jpg', '.jpeg', '.png'];
    
    // Validar tamanho máximo dos arquivos
    const tamanhoMaximo = 5 * 1024 * 1024; // 5MB

    // Implementar validações específicas
    
    next();
};

const validarDataComprovantes = (req, res, next) => {
    // Implementar validação das datas dos comprovantes
    // Verificar se o comprovante antigo tem pelo menos 1 ano
    
    next();
};

const converterParaBase64 = async (arquivo) => {
    try {
        // Lê o buffer do arquivo
        const buffer = await fs.readFile(arquivo.path);
        
        // Converte para base64
        const base64 = buffer.toString('base64');
        
        // Retorna objeto com informações do arquivo
        return {
            nome: arquivo.originalname,
            tipo: arquivo.mimetype,
            tamanho: arquivo.size,
            base64: base64
        };
    } catch (erro) {
        throw new Error(`Erro ao converter arquivo para base64: ${erro.message}`);
    }
};

const processarDocumentos = async (arquivos) => {
    try {
        const documentosProcessados = {};
        
        // Processa cada arquivo do objeto arquivos
        for (const [chave, arquivo] of Object.entries(arquivos)) {
            documentosProcessados[chave] = await converterParaBase64(arquivo);
        }
        
        return documentosProcessados;
    } catch (erro) {
        throw new Error(`Erro ao processar documentos: ${erro.message}`);
    }
};


module.exports = {
    formatarCPF,
    formatarCNPJ,
    validarCamposObrigatorios,
    validarDocumentosPJ,
    validarDataComprovantes,
    processarDocumentos,
    converterParaBase64
}