CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo_usuario VARCHAR(20) CHECK (tipo_usuario IN ('fisico', 'juridico', 'admin')) NOT NULL,
    criado_em TIMESTAMP DEFAULT NOW()
);

CREATE TABLE produtores_fisicos (
    id_produtor SERIAL PRIMARY KEY,
    id_usuario INT UNIQUE REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    nome_completo VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    endereco TEXT NOT NULL
);

CREATE TABLE produtores_juridicos (
    id_empresa SERIAL PRIMARY KEY,
    id_usuario INT UNIQUE REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    razao_social VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    endereco TEXT NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    data_nascimento DATE NOT NULL
);