import axios from 'axios'
import { useContext } from 'react';

import { QuotesContext } from '../../contexts/quoteContext';

const EditItemModal = ({onClose, id}) => {
    const {quotes, setQuotes} = useContext(QuotesContext);  
    const selectedQuote = quotes.find(quote => quote.id === id);
  
    const editQuote = () => {
        const text = document.getElementById("text-input-edit").value;
        const book= document.getElementById("book-input-edit").value;
        
        axios.put(`http://localhost:6001/quote/${id}`, {
          text: text,
          book: book
        })
        .then(response => {
          const updatedQuote = response.data;
          const updatedQuotes = quotes.map(quote => {
            if(quote.id === id) {
              return updatedQuote;
            }
            else {
              return quote;
            }
          });
          setQuotes(updatedQuotes);
          onClose();
        })
        .catch(error => {
          console.log("Error updating quote info: ", error);
        })
      }

    return (
        <div className="overlay">
                    <div className="modal" id="edit-item-modal">
                      <div className="content">
                      <p>Edit Quote</p>
                      <form id="form" onSubmit={editQuote}>
                          <textarea id="text-input-edit" className="textarea-box" placeholder="Text" defaultValue={selectedQuote.text} required></textarea>
                          <input id="book-input-edit" className="input-box" type="text" placeholder="Book" defaultValue={selectedQuote.book}></input>
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