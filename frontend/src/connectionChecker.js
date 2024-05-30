import Axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { BooksContext } from './contexts/bookContext'

const ConnectionChecker = () => {
    const checkInterval = 3000
    const [isOffline, setIsOffline] = useState(false)
    
    const {books, setBooks} = useContext(BooksContext)
    console.log(books)
     async function checkConnection() {
        try {
             await Axios.get('http://localhost:6001/ping')
             if(isOffline === true)
                window.location.reload();

            //update books with the modifications made during the connection failure
            

             setIsOffline(false);
        }
        catch (error) {
            setIsOffline(true);
        }
    }

    setInterval(checkConnection, checkInterval);
    return (
        <>
        {isOffline && <h3 style={{ color: 'white'}}>You are offline. Retrying connection in 3 seconds...</h3>}
        </>
    )
}

export default ConnectionChecker;