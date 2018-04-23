type Quote = Readonly<{
    ID: number;
    title: string | null | undefined;
    content: string;
    link: string;
}>;

type QuoteCollection = ReadonlyArray<Quote>;

type TextInput = string | null | undefined;
type Nullable<T> = T | null | undefined;

const QUOTES_API = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=20";
const DISPLAY_DURATION = 4; // secs

/**
 *
 * @param id
 */
function getElement(id: string) {
    const element = document.getElementById(id);

    if (element === null) {
        throw new Error("Boom!");
    }

    return element;
}

const header = getElement("header");
const text = getElement("text");

/**
 *
 */
async function fetchRandomQuotes() {
    const response = await fetch(QUOTES_API);
    const json = await response.json();

    return json as QuoteCollection;
}

/**
 *
 * @param quote
 */
function formatTitle(title: Nullable<string>) {
    if (typeof title === "string") {
        return title.trim().toUpperCase();
    }
    return "n/a";
}

/**
 *
 * @param quote
 */
function renderQuote(quote: Quote) {
    header.innerText = formatTitle(quote.title);
    text.innerHTML = quote.content;
}

/**
 *
 * @param quotes
 */
function renderRandomQuote(quotes: QuoteCollection) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    renderQuote(randomQuote);
}

fetchRandomQuotes().then((quotes) => {
    renderRandomQuote(quotes);
    setInterval(() => {
        renderRandomQuote(quotes);
    }, DISPLAY_DURATION * 1000);
});
