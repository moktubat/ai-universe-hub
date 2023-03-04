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
const showCardDetail = (card) =>{
    const cardModalDetail = document.getElementById('modal-body');
    cardModalDetail.innerHTML = `
        <div class="row">
        <div class="col-sm-6 border rounded border-danger bg-danger-subtle bg-opacity-10 my-3 py-3 shadow-lg">
            <h5 class="pb-3">${card.description}</h5>
            <div class="row container text-center gap-2 ">
                <div class="container shadow-lg col-3 py-3 text-success bg-light rounded">
                    <div class="card-body">
                        <h6>${card.pricing ? card.pricing[0].price : 'Free of Cost'}</h6>
                        <h6>${card.pricing ? card.pricing[0].plan : 'Basic'}</h6>
                    </div>
                </div>
                <div class="container shadow-lg col-3 py-3 text-warning bg-light rounded">
                    <div class="card-body">
                    <h6>${card.pricing ? card.pricing[1].price : 'Free of Cost'}</h6>
                    <h6>${card.pricing ? card.pricing[1].plan : 'Pro'}</h6>
                    </div>
                </div>
                <div class="container shadow-lg col-3 py-3 text-danger bg-light rounded">
                    <div class="card-body">
                    <h6>${card.pricing ? card.pricing[2].price : 'Free of Cost'}</h6>
                    <h6>${card.pricing ? card.pricing[2].plan : 'Enterprise'}</h6>
                    </div>
                </div>
            </div>
            <div class="row container pt-3">
                <div class="col-6">
                    <h4>Features</h4>
                    <ul>
                        <li>${card.features[1].feature_name}</li>
                        <li>${card.features[2].feature_name}</li>
                        <li>${card.features[3].feature_name}</li>
                    </ul>
                </div>

                <div class="col-6">
                    <h4>Integrations</h4>
                    <ul>
                        <li>${card.integrations ? card.integrations[0] : "No data found"}</li>
                        <li>${card.integrations ? card.integrations[1] : "No data found"}</li>
                        <li>${card.integrations ? card.integrations[2] : "No data found"}</li>
                    </ul>                    
                </div>
            </div>
        </div>
        <div class="col-sm-6 text-center">
            <div class="position-relative">
                <img src="${card.image_link[0]}" id="image" class="img-fluid shadow-lg py-4"/>
                <p style="position: absolute; top: 30px; right: 10px;" class="badge text-bg-danger accuracy py-2">${card.accuracy.score * 100} % accuracy</p>
            </div>
            <h5>${card.input_output_examples ? card.input_output_examples[0].input : 'Can you give any example?'}</h5>
            <p>${card.input_output_examples ? card.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
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


const sorting = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    if (dateA > dateB) {
    return 1;
    }
    else if (dateA < dateB) { return -1;
    }
    else {
    return 0;
    }
    };
    document.getElementById("sorting-date").addEventListener("click", function () {
    console.log(datas.sort(sorting));
    });

fetchCard(6);