/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints para gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cadastra um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               marca:
 *                 type: string
 *               descricao:
 *                 type: string
 *               ingredientes:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 produto:
 *                   $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /produtos/search:
 *   get:
 *     summary: Busca produtos por nome
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do produto a ser buscado
 *     responses:
 *       200:
 *         description: Lista de produtos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto específico pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto existente pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               marca:
 *                 type: string
 *               descricao:
 *                 type: string
 *               ingredientes:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 produto:
 *                   $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Deleta um produto existente pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro no servidor
 */
