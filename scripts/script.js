const fetchCard = () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch (url)
    .then(res => res.json())
    .then(data => displayCards(data.data))
}

const displayCards = cards => {
    const cardsContainer = document.getElementById('cards-container');
    cards.tools = cards.tools.slice(0, 6);
    cards.tools.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col', 'pb-4');
        cardDiv.innerHTML = `
        <div class="card h-100">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Features</h5>
                <ol>
                <li class="card-text">${card.features[0] ? card.features[0] : ''}</li>
                <li class="card-text">${card.features[1] ? card.features[1] : ''}</li>
                <li class="card-text">${card.features[2] ? card.features[2] : ''}</li>
                <li class="card-text">${card.features[3] ? card.features[3] : ''}</li>
                </ol>
            </div>
            <div class="card-footer border-0 bg-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text"><i class="fa-regular fa-calendar-days"></i> <small class="text-muted">${card.published_in}</small></p>
                  </div>

                  <div class="col align-self-end">
                  <button type="button" class="btn btn-primary"><i class="fa-solid fa-arrow-right"></i></button>
                  
                  </div>
                </div>
            </div>
                
            

        </div>
        `;
        cardsContainer.appendChild(cardDiv);

    });
}

fetchCard();