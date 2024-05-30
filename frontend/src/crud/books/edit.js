import axios from 'axios'
import { useContext } from 'react';

import { BooksContext } from '../../contexts/bookContext';

const EditItemModal = ({onClose, id}) => {
    const {books, setBooks} = useContext(BooksContext);  
    const selectedBook = books.find(book => book.id === id);
  
    const editBook = () => {
        const title = document.getElementById("title-input-edit").value;
        const author= document.getElementById("author-input-edit").value;
        const genre= document.getElementById("genre-input-edit").value;
        const year= document.getElementById("year-input-edit").value;
        const description = document.getElementById("description-input-edit").value;
        const price = document.getElementById("price-input-edit").value;
        
        axios.put(`http://localhost:6001/book/${id}`, {
          title: title,
          author: author, 
          genre: genre,
          year: year,
          description: description,
          price: price
        })
        .then(response => {
          const updatedBook = response.data;
          const updatedBooks = books.map(book => {
            if(book.id === id) {
              return updatedBook;
            }
            else {
              return book;
            }
          });
          setBooks(updatedBooks);
          onClose();
        })
        .catch(error => {
          console.log("Error updating book info: ", error);
        })
      }

    return (
        <div className="overlay">
                    <div className="modal" id="edit-item-modal">
                      <div className="content">
                      <p>Edit Book</p>
                      <form id="form" onSubmit={editBook}>
                          <input id="title-input-edit" className="input-box" type="text" placeholder="Title" defaultValue={selectedBook.title} required></input>
                          <input id="author-input-edit" className="input-box" type="text" placeholder="Author" defaultValue={selectedBook.author} required></input>
                          <input id="genre-input-edit" className="input-box" type="text" placeholder="Genre" defaultValue={selectedBook.genre} required></input>
                          <input id="year-input-edit" className="input-box" type="number" placeholder="Year" defaultValue={selectedBook.year} required></input>
                          <textarea id="description-input-edit" className="textarea-box" placeholder="Description" defaultValue={selectedBook.description} required></textarea>
                          <input id="price-input-edit" className="input-box" type="number" placeholder="Price" defaultValue={selectedBook.price} required></input>
                          <div className="buttons">
                            <button className="confirm-button" type="submit">Save</button>
                            <button className="deny-button" onClick={onClose} type="button">Cancel</button>
                          </div>
                      </form>
                      </div>
                    </div>
                </div>
      )
}

export default EditItemModal;