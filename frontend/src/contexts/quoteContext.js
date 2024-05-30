import { createContext } from "react";

const InitialValue = {
    quotes: [],
    setQuotes: () => {},
}

export const QuotesContext = createContext(InitialValue);

const QuotesProvider = ({quotes, setQuotes, children}) => {
    return (
        <QuotesContext.Provider value={ {quotes, setQuotes} }>
            {children}
        </QuotesContext.Provider>
    )
}

export default QuotesProvider;