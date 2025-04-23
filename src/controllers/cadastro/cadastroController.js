const { knex } = require('../../database/connectionDb');
const { processarDocumentos } = require('../../utils/util');

const uploadDocumentosPF = async (req, res) => {
    try {
        const {
            titulo,
            descricao,
            id_usuario
        } = req.body;

        // Verifica se há arquivos
        if (!req.files) {
            return res.status(400).json({ erro: 'Nenhum arquivo foi enviado' });
        }

        // Verifica cada arquivo obrigatório
        const arquivosObrigatorios = [
            'documentoIdentidade',
            'cpf',
            'comprovanteResidencia',
            'curriculo',
            'certidaoRegularidade',
            'certidaoFuncultura'
        ];

        const arquivosFaltantes = arquivosObrigatorios.filter(
            arquivo => !req.files[arquivo] || !req.files[arquivo][0]
        );

        if (arquivosFaltantes.length > 0) {
            return res.status(400).json({ 
                erro: 'Documentos obrigatórios não fornecidos',
                documentosFaltantes: arquivosFaltantes
            });
        }

        // Validação dos campos do body
        if (!titulo || !id_usuario) {
            return res.status(400).json({ erro: 'Título e ID do usuário são obrigatórios' });
        }

        // Processa e converte os documentos para base64
        const documentosProcessados = await processarDocumentos(req.files);

        // Salva no banco de dados
        const [documentoId] = await knex('documentos').insert({
            id_usuario,
            tipo_cadastro: 'fisico',
            titulo,
            descricao: descricao || null,
            documentos: JSON.stringify(documentosProcessados),
            criado_em: knex.fn.now(),
            atualizado_em: knex.fn.now()
        }).returning('id');

        return res.status(201).json({ 
            mensagem: 'Documentos cadastrados com sucesso',
            id_documento: documentoId.id,
            id_usuario,
            titulo,
            descricao,
            documentos: Object.keys(documentosProcessados)
        });
    } catch (erro) {
        console.error('Erro ao cadastrar documentos:', erro);
        return res.status(500).json({ 
            erro: 'Erro ao processar documentos',
            detalhes: erro.message
        });
    }
};

const uploadDocumentosPJ = async (req, res) => {
    try {
        const {
            titulo,
            descricao,
            id_usuario
        } = req.body;

        const {
            contratoSocial,
            comprovanteEnderecoAtual,
            comprovanteEnderecoAntigo,
            curriculoEmpresa,
            certidaoRegularidade,
            certidaoFuncultura,
            cnpj
        } = req.files;

        // Validações
        if (!contratoSocial || !comprovanteEnderecoAtual || !comprovanteEnderecoAntigo || 
            !curriculoEmpresa || !certidaoRegularidade || !certidaoFuncultura || !cnpj) {
            return res.status(400).json({ erro: 'Todos os documentos são obrigatórios' });
        }

        // Validação do título e id_usuario
        if (!titulo) {
            return res.status(400).json({ erro: 'O título é obrigatório' });
        }

        if (!id_usuario) {
            return res.status(400).json({ erro: 'ID do usuário é obrigatório' });
        }

        // Processa e converte os documentos para base64
        const documentosProcessados = await processarDocumentos(req.files);

        // Salva no banco de dados usando Knex
        const [documentoId] = await knex('documentos').insert({
            id_usuario,
            tipo_cadastro: 'juridico',
            titulo,
            descricao: descricao || null,
            documentos: JSON.stringify(documentosProcessados),
            criado_em: knex.fn.now(),
            atualizado_em: knex.fn.now()
        });

        return res.status(201).json({ 
            mensagem: 'Documentos cadastrados com sucesso',
            id: documentoId,
            id_usuario,
            titulo,
            descricao,
            documentos: Object.keys(documentosProcessados)
        });
    } catch (erro) {
        console.error('Erro ao cadastrar documentos:', erro);
        return res.status(500).json({ erro: 'Erro ao processar documentos' });
    }
};

const renovacaoPF = async (req, res) => {
    try {
        const {
            titulo,
            descricao,
            id_usuario
        } = req.body;

        if (!id_usuario) {
            return res.status(400).json({ erro: 'ID do usuário é obrigatório' });
        }

        const {
            comprovanteResidencia,
            certidaoRegularidade,
            certidaoFuncultura,
            curriculo
        } = req.files;

        // Validações
        if (!comprovanteResidencia || !certidaoRegularidade || !certidaoFuncultura) {
            return res.status(400).json({ erro: 'Documentos obrigatórios não fornecidos' });
        }

        // Processa os novos documentos
        const documentosProcessados = await processarDocumentos(req.files);

        // Busca documento existente
        const documentoExistente = await knex('documentos')
            .where({
                id_usuario,
                tipo_cadastro: 'fisico'
            })
            .first();

        if (!documentoExistente) {
            return res.status(404).json({ erro: 'Cadastro não encontrado' });
        }

        // Mescla documentos existentes com novos
        const documentosAtuais = JSON.parse(documentoExistente.documentos);
        const documentosAtualizados = {
            ...documentosAtuais,
            ...documentosProcessados
        };

        // Atualiza no banco
        await knex('documentos')
            .where('id', documentoExistente.id)
            .update({
                documentos: JSON.stringify(documentosAtualizados),
                atualizado_em: knex.fn.now()
            });

        return res.status(200).json({ 
            mensagem: 'Documentos atualizados com sucesso',
            documentos: Object.keys(documentosProcessados)
        });
    } catch (erro) {
        console.error('Erro ao renovar documentos:', erro);
        return res.status(500).json({ erro: 'Erro ao processar renovação' });
    }
};

const renovacaoPJ = async (req, res) => {
    try {
        const {
            titulo,
            descricao,
            id_usuario
        } = req.body;

        if (!id_usuario) {
            return res.status(400).json({ erro: 'ID do usuário é obrigatório' });
        }

        const {
            comprovanteEndereco,
            certidaoRegularidade,
            certidaoFuncultura,
            cnpj,
            contratoSocial
        } = req.files;

        // Validações
        if (!comprovanteEndereco || !certidaoRegularidade || !certidaoFuncultura || !cnpj) {
            return res.status(400).json({ erro: 'Documentos obrigatórios não fornecidos' });
        }

        // Processa os novos documentos
        const documentosProcessados = await processarDocumentos(req.files);

        // Busca documento existente
        const documentoExistente = await knex('documentos')
            .where({
                id_usuario,
                tipo_cadastro: 'juridico'
            })
            .first();

        if (!documentoExistente) {
            return res.status(404).json({ erro: 'Cadastro não encontrado' });
        }

        // Mescla documentos existentes com novos
        const documentosAtuais = JSON.parse(documentoExistente.documentos);
        const documentosAtualizados = {
            ...documentosAtuais,
            ...documentosProcessados
        };

        // Atualiza no banco
        await knex('documentos')
            .where('id', documentoExistente.id)
            .update({
                documentos: JSON.stringify(documentosAtualizados),
                atualizado_em: knex.fn.now()
            });

        return res.status(200).json({ 
            mensagem: 'Documentos atualizados com sucesso',
            documentos: Object.keys(documentosProcessados)
        });
    } catch (erro) {
        console.error('Erro ao renovar documentos:', erro);
        return res.status(500).json({ erro: 'Erro ao processar renovação' });
    }
};

module.exports = {
    uploadDocumentosPF,
    uploadDocumentosPJ,
    renovacaoPF,
    renovacaoPJ
};