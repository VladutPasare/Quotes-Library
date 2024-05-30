import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

import AddItemModal from '../crud/books/add';
import RemoveItemModal from '../crud/books/remove';
import EditItemModal from '../crud/books/edit';
import ViewItemModal from '../crud/books/view';
import BooksProvider, { BooksContext } from '../contexts/bookContext';

const BooksPage = () => {
    const {books, setBooks} = useContext(BooksContext);
    
    useEffect(() => {
        axios.get('http://localhost:6001/books/')
             .then(response => {
                setBooks(response.data);
             })
             .catch(error => {
              console.log('Error fetching books: ', error);
             });
      }, []);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    }

    let pageCount = Math.ceil(books.length / itemsPerPage);

    if(books.length % itemsPerPage === 0) 
        pageCount++;

    const offset = currentPage * itemsPerPage;

    const currentBooks = books.slice(offset, offset + itemsPerPage);

    const sortBooks = () => {
        const sortedBooks = [...books].sort((a, b) => a.price - b.price);
        setBooks(sortedBooks);
    }

    const [isOpenAddComponent, setIsOpenAddComponent] = useState(false);
    const [isOpenRemoveComponent, setIsOpenRemoveComponent] = useState(false);
    const [isOpenEditComponent, setIsOpenEditComponent] = useState(false);
    const [isOpenViewComponent, setIsOpenViewComponent] = useState(false);
    const [selectedBookIndex, setSelectedBookIndex] = useState(null);

    const listItems = currentBooks.map(book => <div className="card" key={ book.id }>
                                                    <div className="box">
                                                        <div className="content">
                                                            <h4>{ book.author }</h4>
                                                            <h2>{ book.title }</h2>
                                                            <p className="description">{ book.description }</p>
                                                            <p className="price"> {book.price}$</p>
                                                            </div>
                                                            <div className="actions">
                                                            <div>
                                                                <i className="fa fa-pencil" onClick={() => {setIsOpenEditComponent(true); setSelectedBookIndex(book.id)}}></i>
                                                            </div>    
                                                            <div>
                                                                <i className="fa fa-minus" onClick={() => {setIsOpenRemoveComponent(true); setSelectedBookIndex(book.id)}}></i>
                                                            </div>
                                                            
                                                            <div href="www.google.com" onClick={() => {setIsOpenViewComponent(true); setSelectedBookIndex(book.id)}}>
                                                                <i className="fa fa-arrow-right"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>);
    
    return (
        <div>
        <div className="commands">
            <button onClick={sortBooks}>Sort by price</button>
        </div>
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
                    {isOpenRemoveComponent && <RemoveItemModal onClose={() => {setIsOpenRemoveComponent(false); setSelectedBookIndex(null);}} id={(selectedBookIndex)}/>}
                    {isOpenEditComponent && <EditItemModal onClose={() => {setIsOpenEditComponent(false); setSelectedBookIndex(null);}} id={(selectedBookIndex)}/>}
                    {isOpenViewComponent && <ViewItemModal onClose={() => {setIsOpenViewComponent(false); setSelectedBookIndex(null);}} id={(selectedBookIndex)}/>}
            
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
    </div>
    );
}

export default BooksPage;