import QuoteForm from "../components/quotes/QuoteForm";
import {useHistory} from 'react-router-dom'
import useHttp from "../hooks/use-http";
import {addQuote} from "../lib/api";
import {useEffect} from "react";

const NewQuotes = () => {
    const history = useHistory();
    const {sendRequest, status} = useHttp(addQuote);

    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
    };

    useEffect(() => {
        if (status === 'completed') {
            history.push('/quotes');
        }
    }, [status, history]);

    return (
        <section>
            <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
        </section>
    );
};

export default NewQuotes;
