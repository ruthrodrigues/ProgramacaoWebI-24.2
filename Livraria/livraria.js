const express = require('express');
const app = express();
app.use(express.json());

let livros = [];

// Criar um livro
app.post('/api/livros/criar', (req, res) => {
    const novoLivro = { id: Date.now(), ...req.body };
    livros.push(novoLivro);
    res.json(novoLivro);
});

// Ler todos os livros
app.get('/api/livros/listar', (req, res) => {
    res.json(livros);
});

// Atualizar um livro por ID
app.put('/api/livros/atualizar/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(livro => livro.id === id);
    if (index !== -1) {
        livros[index] = { id, ...req.body };
        res.json(livros[index]);
    } else {
        res.status(404).json({ erro: 'Livro não encontrado' });
    }
});

// Deletar um livro por ID
app.delete('/api/livros/remover/:id', (req, res) => {
    const id = parseInt(req.params.id);
    livros = livros.filter(livro => livro.id !== id);
    res.json({ mensagem: 'Livro removido com sucesso' });
});

// Buscar livros por editora
app.get('/api/livros/buscar/editora/:editora', (req, res) => {
    const editora = req.params.editora;
    const resultado = livros.filter(livro => livro.editora === editora);
    res.json(resultado);
});

// Buscar livros por palavra-chave no título
app.get('/api/livros/buscar/titulo/:palavra', (req, res) => {
    const palavra = req.params.palavra.toLowerCase();
    const resultado = livros.filter(livro => livro.titulo.toLowerCase().includes(palavra));
    res.json(resultado);
});

// Buscar livros acima de um preço
app.get('/api/livros/buscar/preco/acima/:preco', (req, res) => {
    const preco = parseFloat(req.params.preco);
    const resultado = livros.filter(livro => livro.preco > preco);
    res.json(resultado);
});

// Buscar livros abaixo de um preço
app.get('/api/livros/buscar/preco/abaixo/:preco', (req, res) => {
    const preco = parseFloat(req.params.preco);
    const resultado = livros.filter(livro => livro.preco < preco);
    res.json(resultado);
});

// Buscar livros mais recentes
app.get('/api/livros/buscar/mais-recentes', (req, res) => {
    const resultado = [...livros].sort((a, b) => b.ano - a.ano);
    res.json(resultado);
});

// Buscar livros mais antigos
app.get('/api/livros/buscar/mais-antigos', (req, res) => {
    const resultado = [...livros].sort((a, b) => a.ano - b.ano);
    res.json(resultado);
});

// Buscar livros sem estoque
app.get('/api/livros/buscar/sem-estoque', (req, res) => {
    const resultado = livros.filter(livro => livro.quant === 0);
    res.json(resultado);
});

// Erro 404
app.use((req, res) => {
    res.status(404).json({ erro: 'Endpoint não encontrado' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));