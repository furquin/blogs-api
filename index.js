const express = require('express');
const routerUser = require('./routes/user');
const routerLogin = require('./routes/login');
const routerCategories = require('./routes/categories');
const routerPost = require('./routes/posts');
const error = require('./middlewares/erros');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/user', routerUser);
app.use('/login', routerLogin);
app.use('/categories', routerCategories);
app.use('/post', routerPost);
app.use(error);

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000 !'));
