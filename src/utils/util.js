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

const validarDocumentosPF = (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ erro: 'Nenhum arquivo foi enviado' });
        }

        // Verifica cada arquivo
        for (const arquivo of Object.values(req.files)) {
            // Verifica o tipo do arquivo
            if (arquivo[0].mimetype !== 'application/pdf') {
                return res.status(400).json({ 
                    erro: `O arquivo ${arquivo[0].originalname} deve ser um PDF`
                });
            }

            // Verifica o tamanho do arquivo (10MB)
            if (arquivo[0].size > 10 * 1024 * 1024) {
                return res.status(400).json({ 
                    erro: `O arquivo ${arquivo[0].originalname} excede o limite de 10MB`
                });
            }
        }

        next();
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao validar documentos' });
    }
};

const validarDocumentosPJ = (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ erro: 'Nenhum arquivo foi enviado' });
        }

        // Verifica cada arquivo
        for (const arquivo of Object.values(req.files)) {
            // Verifica o tipo do arquivo
            if (arquivo[0].mimetype !== 'application/pdf') {
                return res.status(400).json({ 
                    erro: `O arquivo ${arquivo[0].originalname} deve ser um PDF`
                });
            }

            // Verifica o tamanho do arquivo (10MB)
            if (arquivo[0].size > 10 * 1024 * 1024) {
                return res.status(400).json({ 
                    erro: `O arquivo ${arquivo[0].originalname} excede o limite de 10MB`
                });
            }
        }

        next();
    } catch (erro) {
        return res.status(500).json({ erro: 'Erro ao validar documentos' });
    }
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
        
        // Verifica se arquivos existe e não está vazio
        if (!arquivos || Object.keys(arquivos).length === 0) {
            throw new Error('Nenhum arquivo foi enviado');
        }

        // Processa cada arquivo do objeto arquivos
        for (const [chave, arquivo] of Object.entries(arquivos)) {
            // Verifica se o arquivo existe e tem o primeiro elemento
            if (!arquivo || !arquivo[0]) {
                throw new Error(`Arquivo ${chave} não foi enviado corretamente`);
            }

            // Acessa o primeiro arquivo do array (multer sempre retorna um array)
            const arquivoAtual = arquivo[0];

            // Verifica se o buffer existe
            if (!arquivoAtual.buffer) {
                throw new Error(`Arquivo ${chave} não contém dados`);
            }

            // Converte para base64
            const base64 = arquivoAtual.buffer.toString('base64');
            
            documentosProcessados[chave] = {
                nome: arquivoAtual.originalname,
                tipo: arquivoAtual.mimetype,
                tamanho: arquivoAtual.size,
                base64: base64
            };
        }
        
        return documentosProcessados;
    } catch (erro) {
        console.error('Erro no processamento:', erro);
        throw new Error(`Erro ao processar documentos: ${erro.message}`);
    }
};


module.exports = {
    formatarCPF,
    formatarCNPJ,
    validarCamposObrigatorios,
    validarDocumentosPF,
    validarDocumentosPJ,
    validarDataComprovantes,
    processarDocumentos,
    converterParaBase64
}