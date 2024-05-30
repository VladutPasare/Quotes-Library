import { useEffect, useState } from "react";
import axios from 'axios'
import ReactPaginate from 'react-paginate'

import AddItemModal from '../crud/quotes/add';
import RemoveItemModal from '../crud/quotes/remove';
import EditItemModal from '../crud/quotes/edit';
import ViewItemModal from '../crud/quotes/view';

import { useContext } from 'react';
import { BooksContext } from '../contexts/bookContext';

import QuotesProvider from "../contexts/quoteContext";


const QuotesPage = () => {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:6001/quotes/')
             .then(response => {
                setQuotes(response.data);
             })
             .catch(error => {
              console.log('Error fetching quotes: ', error);
             });
      }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    }

    let pageCount = Math.ceil(quotes.length / itemsPerPage);

    if(quotes.length % itemsPerPage === 0)
        pageCount++;

    const offset = currentPage * itemsPerPage;

    const currentQuotes = quotes.slice(offset, offset + itemsPerPage);

    const [isOpenAddComponent, setIsOpenAddComponent] = useState(false);
    const [isOpenRemoveComponent, setIsOpenRemoveComponent] = useState(false);
    const [isOpenEditComponent, setIsOpenEditComponent] = useState(false);
    const [isOpenViewComponent, setIsOpenViewComponent] = useState(false);
    const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);

const {books, setBooks} = useContext(BooksContext); 
   function getBookName(id) {
        console.log("\n\n\n\n\n\naici", books)
        let name = books.find(book => book.id === id);
        console.log(name)
        return <p>{name.title}</p>
    }
    const listItems = currentQuotes.map(quote => <div className="card" key={ quotes.id }>
                                                    <div className="box">
                                                        <div className="content">
                                                            <h4>{getBookName(quote.id)}</h4>
                                                            <p className="description">{ quote.text }</p>
                                                            </div>
                                                            <div className="actions">
                                                            <div>
                                                                <i className="fa fa-pencil" onClick={() => {setIsOpenEditComponent(true); setSelectedQuoteIndex(quote.id)}}></i>
                                                            </div>    
                                                            <div>
                                                                <i className="fa fa-minus" onClick={() => {setIsOpenRemoveComponent(true); setSelectedQuoteIndex(quote.id)}}></i>
                                                            </div>
                                                            
                                                            <div href="www.google.com" onClick={() => {setIsOpenViewComponent(true); setSelectedQuoteIndex(quote.id)}}>
                                                                <i className="fa fa-arrow-right"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>);
    return (
        <QuotesProvider quotes={quotes} setQuotes={setQuotes}>
        <div>
            <div id="container">
                    { listItems }
                    {currentPage === pageCount - 1? (<div className="card">
                        <div className="card">
                            <div className="box" id="add-new-item">
                                <div className="content">
                                    <button className="add-button" onClick={() => { setIsOpenAddComponent(true);}}><i className="fa fa-plus icon-large"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>) : null} 
                    {isOpenAddComponent && <AddItemModal onClose={() => setIsOpenAddComponent(false)}/>}
                    {isOpenRemoveComponent && <RemoveItemModal onClose={() => {setIsOpenRemoveComponent(false); setSelectedQuoteIndex(null);}} id={(selectedQuoteIndex)}/>}
                    {isOpenEditComponent && <EditItemModal onClose={() => {setIsOpenEditComponent(false); setSelectedQuoteIndex(null);}} id={(selectedQuoteIndex)}/>}
                    {isOpenViewComponent && <ViewItemModal onClose={() => {setIsOpenViewComponent(false); setSelectedQuoteIndex(null);}} id={(selectedQuoteIndex)}/>}
                    
            </div>
            <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
        >
        </ReactPaginate>
    </div>
    </QuotesProvider>
    );
}

export default QuotesPage;