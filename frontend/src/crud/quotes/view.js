import { useContext } from 'react';

import { QuotesContext } from '../../contexts/quoteContext';

const ViewItemModal = ({onClose, id}) => {
    const {quotes, setQuotes} = useContext(QuotesContext);
    const selectedQuote = quotes.find(quote => quote.id === id);

    return (
        <div id="view-overlay">
          <div id="view-item-modal-smaller" className="modal">
            <div className="content">
              <p>Quote: {selectedQuote.text}</p>
              
                <div className="buttons">
                <button className="deny-button" onClick={onClose}>Exit</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ViewItemModal;