import livro from '../models/Livro.js';

class LivroController {
    constructor(parameters) {
        
    }

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).send('Erro ao listar livros');
        }
    }
}

export default LivroController;