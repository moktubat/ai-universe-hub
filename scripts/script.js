const fetchCard = () => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch (url)
    .then(res => res.json())
    .then(data => displayCards(data.data))
}

const displayCards = cards => {
    const cardsContainer = document.getElementById('cards-container');
    const showAll = document.getElementById('show-all');
    if(cards.tools.length > 6){
        cards.tools = cards.tools.slice(0, 6);
        showAll.classList.remove('d-none');
        
    }
    else{
        showAll.classList.add('d-none');
    }

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
                  <button onclick="fetchShowCardDetail('${card.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cardModal">
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                  
                  </div>
                </div>
            </div>
                
            

        </div>
        `;
        cardsContainer.appendChild(cardDiv);

    });
    // spinerSection(false);
}

// const loadSpinner = isLoading =>{
//     const spinerSection = document.getElementById('spinner');
//     if(isLoading){
//         spinerSection.classList.remove('d-none')
//     }
//     else(
//         spinerSection.classList.add('d-none')
//     )
// }


const fetchShowCardDetail = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showCardDetail(data.data));
};

const showCardDetail = cardDetail =>{
    
    const cardModadTitle = document.getElementById('cardModalLabel');
    cardModadTitle.innerText = cardDetail.tool_name;

    const cardDiscription = document.getElementById('card-discription');
    cardDiscription.innerText = cardDetail.description;

    const cardPrice1 = document.getElementById('price1');
    cardPrice1.innerText = cardDetail.pricing[0].price;
	
    const cardPlan1 = document.getElementById('plan1');
    cardPlan1.innerText = cardDetail.pricing[0].plan;

    const cardPrice2 = document.getElementById('price2');
    cardPrice2.innerText = cardDetail.pricing[1].price;
	
    const cardPlan2 = document.getElementById('plan2');
    cardPlan2.innerText = cardDetail.pricing[1].plan;

    const cardPrice3 = document.getElementById('price3');
    cardPrice3.innerText = cardDetail.pricing[2].price;
	
    const cardPlan3 = document.getElementById('plan3');
    cardPlan3.innerText = cardDetail.pricing[2].plan;

    const cardFeatureName1 = document.getElementById('feature_name1');
    cardFeatureName1.innerText = cardDetail.features[1].feature_name;
    const cardFeatureName2 = document.getElementById('feature_name2');
    cardFeatureName2.innerText = cardDetail.features[2].feature_name;
	const cardFeatureName3 = document.getElementById('feature_name3');
    cardFeatureName3.innerText = cardDetail.features[3].feature_name;

    const cardIntegrations1 = document.getElementById('integrations1');
    cardIntegrations1.innerText = cardDetail.integrations[0];
	const cardIntegrations2 = document.getElementById('integrations2');
    cardIntegrations2.innerText = cardDetail.integrations[1];
	const cardIntegrations3 = document.getElementById('integrations3');
    cardIntegrations3.innerText = cardDetail.integrations[2];

    document.getElementById('image').src = cardDetail.image_link[0];
    const cardAccuracy = document.getElementById('accuracy');
    cardAccuracy.innerText = cardDetail.accuracy.score * 100;

    const cardInput = document.getElementById('card-input');
    cardInput.innerText = cardDetail.input_output_examples[0].input;

    const cardOutput = document.getElementById('card-output');
    cardOutput.innerText = cardDetail.input_output_examples[0].output;


}   

fetchCard();