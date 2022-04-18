const express = require('express');
const routerUser = require('./routes/user');
const routerLogin = require('./routes/login');
const routerCategories = require('./routes/categories');
const error = require('./middlewares/erros');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/user', routerUser);
app.use('/login', routerLogin);
app.use('/categories', routerCategories);
app.use(error);

app.listen(process.env.PORT, () => console.log(`ouvindo porta ${process.env.PORT} !`));

app.get('/', (request, response) => {
  response.send();
});
