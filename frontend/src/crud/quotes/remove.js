import axios from 'axios'
import { useContext } from 'react';

import { QuotesContext } from '../../contexts/quoteContext';

const RemoveItemModal = ({onClose, id}) => {
    const {quotes, setQuotes} = useContext(QuotesContext);

    const removeQuote = () => {
        axios.delete(`http://localhost:6001/quote/${id}`)
        .then(response => {
            setQuotes(quotes => quotes.filter(quote => quote.id !== id))
          onClose();
        })
        .catch(error => {
          console.log("Error removing quote: ", error);
        });
        onClose();
    };

    return (
        <div className="overlay">
            <div className="modal" id="remove-item-modal">
                <div className="content">
                <p>Are you sure you want to remove this quote?</p>
                <div className="buttons">
                <button className="confirm-button" onClick = {removeQuote}>Yes</button>
                <button className="deny-button" onClick = {onClose}>No</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default RemoveItemModal;