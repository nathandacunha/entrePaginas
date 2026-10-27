function BookCard({ titulo, autor }) {
  return (
    <article>
      <h2>{titulo}</h2>
      <p>{autor}</p>
    </article>
  );
}

export default BookCard;