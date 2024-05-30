import './App.css';
import './container.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Layout from './routes/layout'
import BooksPage from './routes/booksPage';
import Home from './routes/Home';
import NoPage from './routes/NoPage';
import ConnectionChecker from './connectionChecker';
import QuotesPage from './routes/quotesPage';

import { useEffect, useState } from 'react'

import BooksProvider from './contexts/bookContext';

const App = () => {
    const [books, setBooks] = useState([])
    return (
            <div className="App">
              <BooksProvider books={books} setBooks={setBooks}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    
                     <Route path="books" element={<BooksPage />} />
                     
                     <Route path="quotes" element={<QuotesPage />} />
                    <Route path="*" element={<NoPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
              <ConnectionChecker/>
              </BooksProvider>
            </div> 
          );
}

export default App;