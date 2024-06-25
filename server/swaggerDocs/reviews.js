/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints para gerenciamento de avaliações de produtos
 */

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Cadastra uma nova avaliação para um produto
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               id_produto:
 *                 type: integer
 *               nota:
 *                 type: integer
 *               comentario:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Avaliação cadastrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 review:
 *                   type: object
 *                   properties:
 *                     id_produto:
 *                       type: integer
 *                     nota:
 *                       type: integer
 *                     comentario:
 *                       type: string
 *                     imagem:
 *                       type: string
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Lista todas as avaliações
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de avaliações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_produto:
 *                     type: integer
 *                   nota:
 *                     type: integer
 *                   comentario:
 *                     type: string
 *                   imagem:
 *                     type: string
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /reviews/produto/{id_produto}:
 *   get:
 *     summary: Lista todas as avaliações de um produto específico
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_produto
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de avaliações do produto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_produto:
 *                     type: integer
 *                   nota:
 *                     type: integer
 *                   comentario:
 *                     type: string
 *                   imagem:
 *                     type: string
 *       404:
 *         description: Nenhuma avaliação encontrada para o produto
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     summary: Atualiza uma avaliação existente pelo ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
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
 *               id_produto:
 *                 type: integer
 *               nota:
 *                 type: integer
 *               comentario:
 *                 type: string
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 review:
 *                   type: object
 *                   properties:
 *                     id_produto:
 *                       type: integer
 *                     nota:
 *                       type: integer
 *                     comentario:
 *                       type: string
 *                     imagem:
 *                       type: string
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Deleta uma avaliação existente pelo ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avaliação deletada com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       500:
 *         description: Erro no servidor
 */
