const fetchCard = () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch (url)
    .then(res => res.json())
    .then(data => displayCards(data.data))
}

const displayCards = cards => {
    const cardsContainer = document.getElementById('cards-container');
    cards.tools.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card h-100">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
        </div>
        `;
        cardsContainer.appendChild(cardDiv);
    });
}

fetchCard();