var harvard = 'b5667ea7-6e70-4c89-b8da-a6e91dee8711';
var searchBox = document.querySelector('#search-box');
var cardContainer = document.querySelector('#card-container');
var pageControls = document.querySelector('#page-controls');
var previousPageButton = document.querySelector('#previous-page-button');
let previousPageURL = document.querySelector('#previous-page-url');
var nextPageButton = document.querySelector('#next-page-button');
let nextPageURL = document.querySelector('#next-page-url');

//Run fetch call when you press 'enter'
searchBox.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        //Grab search criteria, then clear search box
        let searchCriteria = searchBox.value;
        searchBox.value = '';
        //Clear Cards
        cardContainer.innerHTML = '';
        //Show Page Controls if not already shown
        if (pageControls.classList.contains('hidden')) {
            pageControls.classList.toggle('hidden')
        }
        //Fetch with basic call to API;
        let apiString = `https://api.harvardartmuseums.org/image?apikey=${harvard}&q="${searchCriteria}"`;
        createCards(apiString);
    }
})

//Grab prev page when you hit "previous"
previousPageButton.addEventListener('click', () => {
    cardContainer.innerHTML = "";
    createCards(previousPageURL.textContent);
})

//Grab next page when you hit "next"
nextPageButton.addEventListener('click', () => {
    if (previousPageButton.classList.contains('hidden')) {
        previousPageButton.classList.toggle('hidden');
    }
    cardContainer.innerHTML = "";
    createCards(nextPageURL.textContent);
})

//Get data, then fill cards
function createCards(apiString) {
    fetch(apiString).then(response => response.json())
        .then((data) => {
            console.log(data)
            //if next page, set it in hidden div.
            if(data.info.next) {
                if (nextPageButton.classList.contains('hidden')) {
                    nextPageButton.classList.toggle('hidden');
                }
                nextPageURL.textContent = data.info.next;
            } else {
                if (!nextPageButton.classList.contains('hidden')) {
                    nextPageButton.classList.toggle('hidden');
                }
            }
            //if previous page, set it in hidden div
            if(data.info.prev) {
                if (previousPageButton.classList.contains('hidden')) {
                    previousPageButton.classList.toggle('hidden');
                }
                previousPageURL.textContent = data.info.next;
            } else {
                if (!previousPageButton.classList.contains('hidden')) {
                    previousPageButton.classList.toggle('hidden');
                }
            }
            
            var records = data.records;
            records.forEach(record => {
                //Create Card and append to container
                var card = document.createElement('DIV');
                cardContainer.appendChild(card);
                card.classList.toggle('card');
                //Create Image and append to card
                var cardImage = document.createElement('IMG');
                card.appendChild(cardImage);
                cardImage.classList.toggle('card-image');
                cardImage.src = record.baseimageurl;
                //Create description and append to card
                var description = document.createElement('P');
                description.textContent = record.alttext;
                card.appendChild(description);
                description.classList.toggle('card-text');
        });
    })
}
