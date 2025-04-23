# Backend Funcultura 🎨

<details>
<summary>📋 Índice (Clique para expandir)</summary>

- [Sobre o Projeto](#-o-que-é-este-projeto)
- [Como Instalar](#-como-fazer-funcionar)
- [Autenticação](#-autenticação)
- [Documentos](#-documentos)
- [Problemas Comuns](#-problemas-comuns)
- [Suporte](#-precisa-de-ajuda)

</details>

## 📝 O que é este projeto?

Este é um sistema especial que ajuda pessoas e empresas a guardar seus documentos importantes para participar dos projetos do Funcultura. É como uma pasta mágica digital! 🗂️

<details>
<summary>🚀 Como fazer funcionar? (Clique para ver)</summary>

### Primeiro, vamos preparar tudo:

1. Certifique-se de ter instalado:
   - Node.js (é como a nossa caixa de ferramentas) 🔧
   - PostgreSQL (é onde guardamos todas as informações) 📦
   - Docker (é como uma caixa mágica que guarda tudo organizado) 🐳

### Passo a passo:

1. Clone o projeto:
```bash
git clone https://github.com/GutembergLima05/Backend-Funcultura.git
```

2. Entre na pasta:
```bash
cd Backend-Funcultura
```

3. Instale as dependências:
```bash
npm install
```

4. Crie o arquivo `.env`:
```env
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=funcultura
DB_PORT=5432
```

5. Inicie o Docker:
```bash
docker-compose up -d
```

</details>

<details>
<summary>🔐 Autenticação (Clique para ver)</summary>

### Cadastro de Usuário Pessoa Física
- **POST** `/user/create`
```json
{
  "email": "seu@email.com",
  "senha": "suaSenha123",
  "tipo_usuario": "fisico",
  "nome_completo": "Seu Nome Completo",
  "data_nascimento": "1990-01-01",
  "cpf": "12345678900",
  "endereco": "Seu endereço completo"
}
```

### Cadastro de Usuário Pessoa Jurídica
- **POST** `/user/create`
```json
{
  "email": "empresa@email.com",
  "senha": "senhaDaEmpresa123",
  "tipo_usuario": "juridico",
  "razao_social": "Nome da Empresa LTDA",
  "cnpj": "12345678000100",
  "endereco": "Endereço da empresa",
  "nome_completo": "Nome do Responsável",
  "cpf": "12345678900",
  "data_nascimento": "1990-01-01"
}
```

### Login
- **POST** `/login`
```json
{
  "email": "seu@email.com",
  "senha": "suaSenha123"
}
```

Resposta de sucesso:
```json
{
  "token": "seu-token-jwt",
  "usuario": {
    "id": 123,
    "email": "seu@email.com",
    "tipo_usuario": "fisico"
  }
}
```

</details>

<details>
<summary>📄 Documentos (Clique para ver)</summary>

### Upload de Documentos Pessoa Física
- **POST** `/documentos/upload-pf`
```json
// Campos de texto
{
  "titulo": "Meus Documentos 2024",
  "descricao": "Documentos para cadastro",
  "id_usuario": "123"
}

// Arquivos (PDF até 10MB cada)
- documentoIdentidade
- cpf
- comprovanteResidencia
- curriculo
- certidaoRegularidade
- certidaoFuncultura
```

### Upload de Documentos Pessoa Jurídica
- **POST** `/documentos/upload-pj`
```json
// Campos de texto
{
  "titulo": "Documentos Empresa 2024",
  "descricao": "Documentos para cadastro",
  "id_usuario": "123"
}

// Arquivos (PDF até 10MB cada)
- contratoSocial
- comprovanteEnderecoAtual
- comprovanteEnderecoAntigo
- curriculoEmpresa
- certidaoRegularidade
- certidaoFuncultura
- cnpj
```

### Renovação de Documentos
<details>
<summary>Ver detalhes de renovação</summary>

#### Pessoa Física
- **POST** `/documentos/renovacao-pf`
```json
// Campos de texto
{
  "titulo": "Renovação 2024",
  "descricao": "Renovação de documentos",
  "id_usuario": "123"
}

// Arquivos (PDF até 10MB cada)
- comprovanteResidencia
- certidaoRegularidade
- certidaoFuncultura
- curriculo (opcional)
```

#### Pessoa Jurídica
- **POST** `/documentos/renovacao-pj`
```json
// Campos de texto
{
  "titulo": "Renovação Empresa 2024",
  "descricao": "Renovação de documentos",
  "id_usuario": "123"
}

// Arquivos (PDF até 10MB cada)
- comprovanteEndereco
- certidaoRegularidade
- certidaoFuncultura
- cnpj
- contratoSocial (opcional)
```
</details>

</details>

<details>
<summary>📝 Regras Importantes (Clique para ver)</summary>

1. Todos os arquivos devem ser PDF
2. Cada arquivo pode ter no máximo 10MB
3. Campos obrigatórios devem ser preenchidos
4. Senhas devem ter no mínimo 6 caracteres
5. CPF e CNPJ devem ser válidos
6. E-mails devem ser únicos no sistema

</details>

<details>
<summary>🎯 Como Testar? (Clique para ver)</summary>

### Usando Postman:

1. Abra o Postman
2. Crie uma nova requisição POST
3. Para login/cadastro:
   - Use "raw" e selecione "JSON"
   - Cole o JSON de exemplo
4. Para upload de documentos:
   - Use "form-data"
   - Adicione os campos de texto
   - Adicione os arquivos PDF
5. Clique em Send (Enviar)

</details>

<details>
<summary>🆘 Problemas Comuns (Clique para ver)</summary>

1. **Erro de autenticação**
   - Verifique se o email e senha estão corretos
   - Certifique-se de que está enviando o token JWT nos headers

2. **Erro nos arquivos**
   - Use apenas PDFs
   - Arquivos menores que 10MB
   - Nomes dos campos corretos

3. **Erro no Docker**
   - Tente: `docker-compose down && docker-compose up -d`

</details>

<details>
<summary>🤝 Precisa de Ajuda? (Clique para ver)</summary>

1. Abra uma "Issue" no GitHub
2. Email: [seu-email@exemplo.com]
3. Discord: [seu-discord]

</details>

## 🌟 Pronto!

Agora você tem um guia completo e organizado! Cada seção pode ser expandida quando precisar, mantendo a página limpa e fácil de navegar! 😊

---
Feito com ❤️ pela equipe Funcultura
