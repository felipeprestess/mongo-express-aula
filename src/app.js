import express from 'express';
import conectaNaDatabase from './config/dbconnect.js';
import livro from './models/Livro.js';

const connection = await conectaNaDatabase();

connection.on('error', (error) => {
    console.log('Erro de conexão:', error);
});

connection.once('open', () => {
    console.log('Banco de dados conectado com sucesso');
});

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send('Curso de NodeJs');
});


app.get('/livros/:id', async (req, res) => {
    const index = buscaIndexLivro(req.params.id);

    const livro = livros[index];
    if (index === -1) {
        return res.status(404).send('Livro não encontrado');
    }
    res.status(200).json(livro);
});

app.post('/livros', (req, res) => {
    const livro = req.body;
    livros.push(livro);
    res.status(201).send('Livro adicionado com sucesso');
});

app.put('/livros/:id', (req, res) => {
    const index = buscaIndexLivro(req.params.id);
    livros[index].titulo = req.body.titulo ?? livros[index].titulo;
    livros[index].autor = req.body.autor ?? livros[index].autor;
    res.status(200).json(livros);

});

app.delete('/livros/:id', (req, res) => {
    const index = buscaIndexLivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso");
});

export default app;

// 