import express from 'express';
const app = express();
const port = 3002;
app.use(express.json());

let posts = [];

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', (req, res) => {
  const post = req.body;
  posts.push(post);
  res.status(201).json(post);
});

app.listen(port, () => {
  console.log(`Publi Service rodando em http://localhost:${port}`);
});
