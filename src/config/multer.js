const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Lista de tipos MIME permitidos
    const tiposPermitidos = ['application/pdf'];
    
    if (!tiposPermitidos.includes(file.mimetype)) {
        // Retorna um erro mais descritivo
        return cb({
            code: 'INVALID_FILE_TYPE',
            field: file.fieldname,
            message: `O arquivo "${file.originalname}" deve ser um PDF. Tipo enviado: ${file.mimetype}`
        }, false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },
    fileFilter: fileFilter
});

// Middleware para tratamento de erros do Multer
const handleMulterError = (err, req, res, next) => {
    if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                erro: 'Tamanho de arquivo excedido',
                detalhes: 'O arquivo não pode ser maior que 10MB'
            });
        }

        if (err.code === 'INVALID_FILE_TYPE') {
            return res.status(400).json({
                erro: 'Tipo de arquivo inválido',
                campo: err.field,
                detalhes: err.message
            });
        }

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                erro: 'Campo não esperado',
                detalhes: 'Foi enviado um campo de arquivo que não está na lista de campos permitidos'
            });
        }

        // Erro genérico do Multer
        return res.status(400).json({
            erro: 'Erro no upload do arquivo',
            detalhes: err.message
        });
    }
    next();
};

module.exports = {
    upload,
    handleMulterError
};
