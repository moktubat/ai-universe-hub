// Data Load and Fetching
const fetchCard = (load) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    fetch (url)
    .then(res => res.json())
    .then(data => displayCards(data.data, load))
}

// Display Card Area with fucntion
const displayCards = (cards, load) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ""
    const showAll = document.getElementById('show-all');
    if(load){
        // // display 6 cards only
        cards.tools = cards.tools.slice(0, load);
        showAll.classList.remove('d-none');
        
    }
    else{
        showAll.classList.add('d-none');
    }
    // Get Single Card from card group with .forEach loop
    cards.tools.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col', 'pb-4');
        // Create .innerHTML for show display card item in card area
        cardDiv.innerHTML = `
        <div class="card h-100 shadow">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol id="${card.id}" class="list-group list-group-numbered text-start">
                    
            </ol>
            </div>
            <div class="card-footer border-0 bg-body">
                <div class="row">
                  <div class="col">
                    <h5 class="card-title">${card.name}</h5>
                    <p class="card-text"><i class="fa-regular fa-calendar-days"></i> <small class="text-muted">${card.published_in}</small></p>
                  </div>

                  <div class="col text-end">
                //   On click button for display single card details
                  <button onclick="fetchShowCardDetail('${card.id}')" type="button" class="btn btn-outline-danger rounded-circle" data-bs-toggle="modal" data-bs-target="#cardModal">
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                  
                  </div>
                </div>
            </div>
                
            

        </div>
        `;
        cardsContainer.appendChild(cardDiv);
        // add features dynamicly in featuresArea 
        const featureContainer = document.getElementById(card.id);
        card.features.forEach((feature) =>{
        const featerItem = document.createElement('li');
        featerItem.classList.add('list-group-item');
        featerItem.innerText = feature;
        featureContainer.appendChild(featerItem);
        })

    });
    loadSpinner(false);
}

// show all card element
document.getElementById('btn-show-all').addEventListener('click', function(){
    // const url = 'https://openapi.programming-hero.com/api/ai/tools';
    // fetch (url)
    // .then(res => res.json())
    // .then(data => displayCards(data.data.slice(0, 12)))

    loadSpinner(true);
    setTimeout( function (){
        fetchCard();
    }, 20000);
    // fetchCard();

})

// Spinner Area
const loadSpinner = isLoading =>{
    const spinerSection = document.getElementById('spinner');
    if(isLoading){
        spinerSection.classList.remove('d-none')
    }
    else(
        spinerSection.classList.add('d-none')
    )
}


// Fetching Single Card Detail for Card Modal
const fetchShowCardDetail = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showCardDetail(data.data));
};

// Function for display card details with modal
const showCardDetail = (modal) =>{
    console.log(modal);
    const cardModalDetail = document.getElementById('modal-body');
    cardModalDetail.innerHTML = `
        <div class="row">
        <div class="col-sm-6 border rounded border-danger bg-danger-subtle bg-opacity-10 my-3 py-3 shadow-lg">
            <h5 class="pb-3">${modal.description}</h5>
            <div class="row container text-center gap-2 ">
                <div class="container shadow-lg col-3 py-3 text-success bg-light rounded">
                    <div class="card-body">
                        <h6>${modal.pricing[0].price ? modal.pricing[0].price : "Free of Cost"}</h6>
                        <h6>${modal.pricing[0].plan}</h6>
                    </div>
                </div>
                <div class="container shadow-lg col-3 py-3 text-warning bg-light rounded">
                    <div class="card-body">
                    <h6>${modal.pricing[1].price}</h6>
                    <h6>${modal.pricing[1].plan}</h6>
                    </div>
                </div>
                <div class="container shadow-lg col-3 py-3 text-danger bg-light rounded">
                    <div class="card-body">
                    <h6>${modal.pricing[2].price}</h6>
                    <h6>${modal.pricing[2].plan}</h6>
                    </div>
                </div>
            </div>
            <div class="row container pt-3">
                <div class="col-6">
                    <h4>Features</h4>
                    <ul>
                        <li>${modal.features[1].feature_name}</li>
                        <li>${modal.features[2].feature_name}</li>
                        <li>${modal.features[3].feature_name}</li>
                    </ul>
                </div>

                <div class="col-6">
                    <h4>Integrations</h4>
                    <ul>
                        <li>${modal.integrations[0]}</li>
                        <li>${modal.integrations[1]}</li>
                        <li>${modal.integrations[2]}</li>
                    </ul>                    
                </div>
            </div>
        </div>
        <div class="col-sm-6 text-center">
            <div class="position-relative">
                <img src="${modal.image_link[0]}" id="image" class="img-fluid shadow-lg py-4"/>
                <p style="position: absolute; top: 30px; right: 10px;" class="badge text-bg-danger accuracy py-2">${modal.accuracy.score * 100} % accuracy</p>
            </div>
            <h5>${modal.input_output_examples[0].input}</h5>
            <p>${modal.input_output_examples[0].output}</p>
        </div>
    </div>
    `;
}

// For Show rest 6 card 
const showAllCardTogether = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
      .then((res) => res.json())
      .then((data) => {
        displayCards(data.data);
      });
  };

fetchCard(6);