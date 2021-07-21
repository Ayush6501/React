import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import {getAllQuotes} from "../lib/api";
import {useEffect} from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
    const {sendRequest, status, data: quotes, error} = useHttp(getAllQuotes, true);

    useEffect(() => {
       sendRequest();
    }, [sendRequest]);

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner />
        </div>
    }

    if (status === 'error') {
        return <p className='centered focused'>{error}</p>;
    }

    if (status === 'completed' && (!quotes || quotes.length === 0)) {
        return <NoQuotesFound />
    }

    return (
        <section>
            {/*<h1>All Quote Page</h1>*/}
            <QuoteList quotes={quotes}/>
        </section>
    );
};

export default AllQuotes;
