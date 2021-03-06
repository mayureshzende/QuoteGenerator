const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('quote-author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//show loading
function showLoadingSpinner(){
    loader.hidden = false ;
    quoteContainer.hidden = true;
}

//hide loading
function hideLoadingSpinner(){
    loader.hidden = true ;
    quoteContainer.hidden = false;
}

// get Quote from API
async function getQuote(){
    showLoadingSpinner();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch( proxyUrl + apiUrl);
        const data = await response.json();

        console.log(data);
        //if quote is larger to display add the css to reduce the font
        if( data.quoteText.length > 100 ){
            quoteText.classList.add('long-quote');
       }else{
           quoteText.classList.remove('long-quote');
       }
        quoteText.innerHTML = data.quoteText;
        
        //if author is unknown
        if(data.quoteAuthor == ''){
            quoteAuthor.innerHTML = 'Unknown'
        }else{
        quoteAuthor.innerHTML = data.quoteAuthor;
        }
        hideLoadingSpinner();
    }catch(error){
        if(error)
        getQuote();
        console.log(error);      
    }
}

//to tweet the quote to url 
function tweetQuote(){
    const quote = quoteText.innerHTML;
    const author = quoteAuthor.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl , '_blank');
}

//addevent listner to button
twitterBtn.addEventListener('click' , tweetQuote);
newQuoteBtn.addEventListener('click',getQuote);


// call the getQuote method onload
getQuote();
