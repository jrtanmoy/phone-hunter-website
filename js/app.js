document.getElementById('error-message').style.display = 'none';
document.getElementById('no-input-error-message').style.display = 'none';
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('no-input-error-message').style.display = 'none';
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('no-input-error-message').style.display = 'block';
    }
    else {
        // load data
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
            .catch(error => displayError(error));
    }
}
/* 
const displayError = error => {
    if (error = []) {
        document.getElementById('error-message').style.display = 'block';
    }
} */

const displaySearchResult = datas => {
    // console.log(datas.data[0]);
    const phones = datas.data;
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (phones.length == 0) {
        document.getElementById('error-message').style.display = 'block';
    }
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        /* div.classList.add('justify-content-between'); */
        // <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
        div.innerHTML = `
        <div class="card h-100 w-75 shadow-lg mx-auto p-3 mb-5 bg-body rounded-3">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body p-0 mb-0">
                <h5 class="card-title">Phone Model: ${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="details('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const details = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPhoneDetail(data.data));
  };
 
const displayPhoneDetail = phone => {
    console.log(phone);
    console.log(phone.releaseDate);
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('shadow-lg');
    div.classList.add('rounded-3');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-4" alt="...">
    <div class="card-body">
        <h5 class="card-title">Name: ${phone.name}</h5>
        <h6 class="card-text">Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date'}</h6>
        <h6>MainFeatures :</h6>
        <p class="card-text fst-italic">1. ChipSet : ${phone.mainFeatures.chipSet}</p>
        <p class="card-text fst-italic">2. DisplaySize : ${phone.mainFeatures.displaySize}</p>
        <p class="card-text fst-italic">3. Memory : ${phone.mainFeatures.memory}</p>
        <p class="card-text fst-italic">4. Sensors : ${phone.mainFeatures.sensors}</p>
        <p class="card-text fst-italic">5. Storage : ${phone.mainFeatures.storage}</p>
    </div>
    `;
    phoneDetails.appendChild(div);
}