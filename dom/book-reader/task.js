document.addEventListener('DOMContentLoaded', () => {
  const sizes = document.querySelectorAll('.font-size');
  const book = document.getElementById('book');


  sizes.forEach((size) => {
    size.addEventListener('click', (event) => {
      event.preventDefault();
      sizes.forEach(btn => {
        btn.classList.remove('font-size_active');
      });
      size.classList.add('font-size_active');
      const selectedSize = size.dataset.size;
      book.classList.remove('book_fs-big', 'book_fs-small');

      if (selectedSize === 'small') {
        book.classList.add('book_fs-small');
      } else if (selectedSize === 'big') {
        book.classList.add('book_fs-big');
      }
    });
  });
});
