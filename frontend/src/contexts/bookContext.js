import { createContext } from "react";

const InitialValue = {
    books: [],
    setBooks: () => {},
}

export const BooksContext = createContext(InitialValue);

const BooksProvider = ({books, setBooks, children}) => {
    return (
        <BooksContext.Provider value={ {books, setBooks} }>
            {children}
        </BooksContext.Provider>
    )
}

export default BooksProvider;