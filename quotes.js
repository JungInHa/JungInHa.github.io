const quotation = document.querySelector(".quotation");
const quote = quotation.querySelector(".quote");
const author = quotation.querySelector(".author");


function loadQuote() {
    fetch(`https://goquotes-api.herokuapp.com/api/v1/random?count=1`).then(function(response){
        return response.json();
    }).then(function(json){
        const text = json.quotes[0].text;
        const from = json.quotes[0].author;
        quote.innerText = `${text}`
        author.innerText = `- ${from}`
    });
}

function init() {
    loadQuote();
}

init();
