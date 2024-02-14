const express = require('express');
const { dbConnection } = require('./database/dbConnection');
const userRouter = require('./src/modules/user/userRouter');
const todoRouter = require('./src/modules/todo/todoRouter');

const app = express();
const port = 3000;
app.use(express.json());
dbConnection();
app.use('/users', userRouter);
app.use('/todos', todoRouter);
/*app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message });
});*/
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
