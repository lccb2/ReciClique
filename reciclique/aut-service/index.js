import express from 'express';
const app = express();
const port = 3001;
app.use(express.json());

app.post('/login', (req, res) => {
  res.json({ message: 'Login realizado!' });
});

app.post('/logout', (req, res) => {
  res.json({ message: 'Logout realizado!' });
});

app.listen(port, () => {
  console.log(`Auth Service rodando em http://localhost:${port}`);
});
