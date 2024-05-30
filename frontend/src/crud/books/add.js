import axios from 'axios'


const AddItemModal = ({ onClose }) => {

    const addBook = () => {
        const title = document.getElementById("title-input").value;
        const author = document.getElementById("author-input").value;
        const genre= document.getElementById("genre-input").value;
        const year= document.getElementById("year-input").value;
        const description = document.getElementById("description-input").value;
        const price = document.getElementById("price-input").value;
  
        axios.post('http://localhost:6001/books/', {
          title: title,
          author: author,
          genre: genre,
          year: year,
          description: description,
          price: price
        })
        .then(response => {
          //const newBook = response.data;
          //setBooks(books => [...books, newBook]);
          onClose();
        })
        .catch(error => {
          console.log("Error adding book: ", error);
        })
    };
    
    return (
        <div className="overlay">
                    <div className="modal" id="add-item-modal">
                      <div className="content">
                      <p>New Book</p>
                      <form id="form" onSubmit={addBook}>
                          <input id="title-input" className="input-box" type="text" placeholder="Title" required></input>
                          <input id="author-input" className="input-box" type="text" placeholder="Author" required></input>
                          <input id="genre-input" className="input-box" type="text" placeholder="Genre" required></input>
                          <input id="year-input" className="input-box" type="number" placeholder="Year" required></input>
                          <textarea id="description-input" className="textarea-box" placeholder="Description" required></textarea>
                          <input id="price-input" className="input-box" type="number" placeholder="Price" required></input>
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