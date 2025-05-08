import express from "express";

const app = express();
const port = 3000;

// Configurar EJS como motor de templates
app.set("view engine", "ejs");

// Servir arquivos estáticos (como CSS)
app.use(express.static("public"));

// Parsear dados de formulários
app.use(express.urlencoded({ extended: true }));

// Lista para armazenar os posts
let posts = [];

// Rota inicial - exibe todos os posts
app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

// Criar novo post
app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect("/");
});

// Rota para exibir a página de edição
app.get("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (post) {
    res.render("edit.ejs", { post: post });
  } else {
    res.redirect("/");
  }
});

// Processar a edição do post (apenas 1 rota POST correta agora)
app.post("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.title = req.body.title;
    post.content = req.body.content;
  }
  res.redirect("/");
});

// Excluir post
app.post("/posts/:id/delete", (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== postId);
  res.redirect("/");
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
