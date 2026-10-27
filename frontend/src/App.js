import './App.css';
import BookCard from './components/BookCard';

const livros = [
  { id: 1, titulo: "Senhor dos Aneis", autor: "J.R Tolkien"},
  {id: 2, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K Rowling"}
];

function App() {
  return (
    <section className="App">
      <header className="App-header">
          <h1>Boas vindas ao Entre Páginas!</h1>
      </header>

      <main>
        {livros.map((livro) => (
          <BookCard
            key={livro.id}
            titulo={livro.titulo}
            autor={livro.autor}  
          /> 
        ))}
      </main>
    </section>
  );
}

export default App;
