import axios from 'axios'
import { useContext } from 'react';

import { BooksContext } from '../../contexts/bookContext';

const RemoveItemModal = ({onClose, id}) => {
    const {books, setBooks} = useContext(BooksContext);

    const removeBook = () => {
        axios.delete(`http://localhost:6001/book/${id}`)
        .then(response => {
          setBooks(books => books.filter(book => book.id !== id))
          onClose();
        })
        .catch(error => {
          console.log("Error removing book: ", error);
        });
        onClose();
    };

    return (
        <div className="overlay">
            <div className="modal" id="remove-item-modal">
                <div className="content">
                <p>Are you sure you want to remove this book?</p>
                <div className="buttons">
                <button className="confirm-button" onClick = {removeBook}>Yes</button>
                <button className="deny-button" onClick = {onClose}>No</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default RemoveItemModal;