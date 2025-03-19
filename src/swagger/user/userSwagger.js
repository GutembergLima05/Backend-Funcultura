/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Operações relacionadas aos usuários
 */

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Cria um usuário
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "dono@gmail.com"
 *               senha:
 *                 type: string
 *                 example: "adm12345"
 *               nome:
 *                 type: string
 *                 example: "Phellipe"
 *               tipo_usuario:
 *                 type: string
 *                 example: "fisico" 
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz login de um usuário
 *     tags: [Usuários]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "dono@gmail.com"
 *               senha:
 *                 type: string
 *                 example: "adm12345"
 *               key: 
 *                 type: string
 *                 example: "dsh&*osoi28gf21020k&!("
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "3"
 *                     nome:
 *                       type: string
 *                       example: "Phellipe"
 *                     email:
 *                       type: string
 *                       example: "dono@gmail.com"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 */