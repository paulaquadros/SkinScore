const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user-route');
const productRoutes = require('./routes/product-route');
const reviewRoutes = require('./routes/review-route');
const indexRoutes = require('./routes/index-route');
const authRoutes = require('./routes/auth-route');
const listaFavoritosRoutes = require('./routes/lista-favoritos-route');
const sequelize = require('./db');
const cors = require('cors');
const setupSwagger = require('./swaggerConfig');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors())

setupSwagger(app);
console.log(`Documentação do SkinScore no Swagger: http://localhost:3001/api-docs`);

app.use('/', indexRoutes);
app.use('/produtos', productRoutes);
app.use('/reviews', reviewRoutes);
app.use('/usuarios', userRoutes);
app.use('/auth', authRoutes);
app.use('/lista-favoritos', listaFavoritosRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar com o banco de dados:', err);
});
