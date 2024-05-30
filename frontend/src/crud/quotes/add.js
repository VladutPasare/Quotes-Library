import axios from 'axios'


const AddItemModal = ({ onClose }) => {

    const addQuote = () => {


        const text = document.getElementById("text-input").value;
        const book = document.getElementById("book-input").value;

        axios.post('http://localhost:6001/quotes/', {
          text: text,
          book: book
        })
        .then(response => {
          //const newBook = response.data;
          //setBooks(books => [...books, newBook]);
          onClose();
        })
        .catch(error => {
          console.log("Error adding quote: ", error);
        })
    };
    
    return (
        <div className="overlay">
                    <div className="modal" id="add-item-modal">
                      <div className="content">
                      <p>New Quote</p>
                      <form id="form" onSubmit={addQuote}>
                          <textarea id="text-input" className="textarea-box" placeholder="Text" required></textarea>
                          <input id="book-input" className="input-box" type="text" placeholder="Book" required></input>
                          <div className="buttons">
                            <button className="confirm-button" type="submit">Add</button>
                            <button className="deny-button" onClick={onClose} type="button">Cancel</button>
                          </div>
                      </form>
                      </div>
                    </div>
                </div>
    );
}

export default AddItemModal;