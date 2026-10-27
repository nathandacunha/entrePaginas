import 'dotenv/config'; 
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cadastroRoutes from './routes/cadastro.js';
import loginRoutes from '../src/routes/login.js';
import logoutRoutes from '../src/routes/logout.js';
import session from 'express-session';
import Database from './models/db.js';
import adicionarLivrosRoutes from './controllers/livros.js';
import { tratadorErros } from './middlewares/tratadorDeErros.js';
import { exigirLoginPagina } from './middlewares/autenticacao.js';

// simula o __dirname em ESmodules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// adiciona uma sessão
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60,
        httpOnly: true,
        sameSite: 'lax'
    }
}));

// leitura do corpo das requisições
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //necessario quando o front usar fetch (PUT/DELETE)

// protegendo as paginas 
app.get(
    ['/pages/index.html', '/pages/adicionar-livro.html'],
    exigirLoginPagina
);

app.use(express.static(path.join(__dirname, 'public')));

// rota raiz que redireciona para o cadastro
app.get('/', (req, res) => {
    res.redirect('/pages/cadastro.html');
});


// usando a rota cadastro e de login
app.use('/cadastro', cadastroRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/livros', adicionarLivrosRoutes);

app.use(tratadorErros);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/pages/cadastro.html`);
});