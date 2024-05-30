import { useContext } from 'react';

import { BooksContext } from '../../contexts/bookContext';

const ViewItemModal = ({onClose, id}) => {
    const {books, setBooks} = useContext(BooksContext);
    const selectedBook = books.find(book => book.id === id);

    return (
        <div id="view-overlay">
          <div id="view-item-modal" className="modal">
            <div className="content">
              <p>Title: {selectedBook.title}</p>
              <p>Author: {selectedBook.author}</p>
              <p>Genre: {selectedBook.genre}</p>
              <p>Year: {selectedBook.year}</p>
              <p>Short description: {selectedBook.description}</p>
              <p>Price: {selectedBook.price}$</p>
                <div className="buttons">
                <button className="deny-button" onClick={onClose}>Exit</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ViewItemModal;