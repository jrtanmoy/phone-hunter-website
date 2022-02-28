// spinner array function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// error massage display
document.getElementById('error-message').style.display = 'none';
document.getElementById('no-input-error-message').style.display = 'none';
// phone search arrow funtion
const searchPhone = () => {
    // get input value
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleSpinner('block');
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('no-input-error-message').style.display = 'none';
    // error handling
    if (searchText == '') {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('no-input-error-message').style.display = 'block';
        toggleSpinner('none');
    }
    else {
        // load data
        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
            // .catch(error => displayError(error));
    }
}
/* 
const displayError = error => {
        document.getElementById('error-message').style.display = 'block';
        
} */
// get the parameter
const displaySearchResult = datas => {
    // slice data
    const phones = datas.data.slice(0,20);
    // get the parent div to append child
    const searchResult = document.getElementById('search-result');
    // clear data
    searchResult.textContent = '';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    // error handling
    if (phones.length == 0) {
        document.getElementById('error-message').style.display = 'block';
        toggleSpinner('none');
    }
    // apply forEach to get every element of an array
    phones.forEach(phone => {
        // create child div
        const div = document.createElement('div');
        div.classList.add('col');
        // set innerHTML
        div.innerHTML = `
        <div class="card h-100 w-75 shadow-lg mx-auto p-3 mb-5 bg-body rounded-3">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body p-0 mb-0">
                <h4 class="card-title">Model: ${phone.phone_name}</h4>
                <h5 class="card-text">Brand: ${phone.brand}</h5>
                <button onclick="details('${phone.slug}')" class="btn btn-primary">Details</button>
            </div>
        </div>
        `;
        // append child
        searchResult.appendChild(div);
        toggleSpinner('none');
    })
}
// function for phone id data
const details = (id) => {
    // load id data
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => displayPhoneDetail(data.data));
  };
//  function for setting details
const displayPhoneDetail = phone => {
    console.log(phone.mainFeatures.sensors);
    // get the parent div to append child
    const phoneDetails = document.getElementById('phone-details');
    // clear data
    phoneDetails.textContent = '';
    // create child div
    const div = document.createElement('div');
    // classes added
    div.classList.add('card');
    div.classList.add('shadow-lg');
    div.classList.add('rounded-3');
    // set innerHTML
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-4" alt="...">
    <div class="card-body">
        <h5 class="card-title">Name: ${phone.name}</h5>
        <h6 class="card-text">Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release date'}</h6>
        <h6>MainFeatures :</h6>
        <p class="card-text fst-italic">1. ChipSet : ${phone.mainFeatures.chipSet}</p>
        <p class="card-text fst-italic">2. DisplaySize : ${phone.mainFeatures.displaySize}</p>
        <p class="card-text fst-italic">3. Memory : ${phone.mainFeatures.memory}</p>
        <p class="card-text fst-italic fw-bold">4. Sensors : ${phone?.mainFeatures?.sensors ? phone.mainFeatures.sensors : 'No sensor found'}</p>
        <p class="card-text fst-italic">5. Storage : ${phone.mainFeatures.storage}</p>
        <h5>Others :</h5>
        <p class="card-text fst-italic">1. Bluetooth : ${phone?.others?.Bluetooth ? phone.others.Bluetooth : 'No bluetooth system'}</p>
        <p class="card-text fst-italic">2. GPS : ${phone?.others?.GPS ? phone.others.GPS : 'No GPS system'}</p>
        <p class="card-text fst-italic">3. NFC : ${phone?.others?.NFC ? phone.others.NFC : 'No NFC system'}</p>
        <p class="card-text fst-italic">4. Radio : ${phone?.others?.Radio ? phone.others.Radio : 'No Radio system'}</p>
        <p class="card-text fst-italic">5. USB : ${phone?.others?.USB ? phone.others.USB : 'No USB system'}</p>
        <p class="card-text fst-italic">6. WLAN : ${phone?.others?.WLAN ? phone.others.WLAN : 'No WLAN system'}</p>
    </div>
    `;
    // append child
    phoneDetails.appendChild(div);
}