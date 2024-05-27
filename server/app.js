const express = require('express');
const path = require('path');
const productRoutes = require('./routes/product-route');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/produtos', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
