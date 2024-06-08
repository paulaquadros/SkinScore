const express = require('express');
const path = require('path');
const productRoutes = require('./routes/product-route');
const reviewRoutes = require('./routes/review-route');
const userRoutes = require('./routes/user-route');
const indexRoutes = require('./routes/index-route');
const sequelize = require('./db');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/', indexRoutes);
app.use('/produtos', productRoutes);
app.use('/reviews', reviewRoutes);
app.use('/usuarios', userRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao sincronizar com o banco de dados:', err);
});
