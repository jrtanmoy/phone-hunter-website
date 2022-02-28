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
        <div class="card h-100 w-75 shadow-lg p-3 mb-5 bg-body rounded rounded-3">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">Phone Model: ${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}