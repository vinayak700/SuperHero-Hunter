// const public_key = '8b36671abf2b6e9f588499dd74ca3d31';
// const private_key = '7154f670db6a3dd09b349a6b3eae4a256299d02c'

// Getting elements from html DOM
let charBucket = document.getElementById('card-container');
let searchBucket = document.getElementById('ul');
let searchInput = document.getElementById('search-input');
const searchList = document.getElementById('search-list');
const notFound = document.getElementById('notFound');
const searchBtn = document.getElementById('search-btn');

const base_url = 'https://gateway.marvel.com/v1/public';
const hash = 'd35377547e551cd64a60657d2517bb7f';

// fetching all characters
async function fetchCharacters() {
    // const ts = new Date().getTime();
    const url = `${base_url}/characters?ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=${hash}&limit=100`;
    const res = await fetch(url);
    const data = await res.json();
    renderCharList(data.data.results);
}
fetchCharacters();

// Rendering all characters
function renderCharList(data) {
    for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div');
        div.className = "card";
        div.innerHTML = `<a href="/SuperHero-Hunter/superhero.html?character=${data[i].id}" class="character-link">
        <img src="${data[i].thumbnail.path}.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${data[i].name}</h5>
        <p>Comics: <span class="comics">${data[i].comics.available}</span></p>
        <p>Series: <span class="series">${data[i].series.available}</span></p>
        </div>
        </a>`;
        
        charBucket.append(div);
    }
}

// Rendering Search results in search results box
function renderSearchList(data) {
    let size = data.length;
    if (size == 0) {
        notFound.style.display = 'block';
    } else {
        notFound.style.display = 'none';
    }
    for (let i = 0; i < size; i++) {
        const li = document.createElement('li');
        li.className = `character-item`;
        li.innerHTML = `<a href="/SuperHero-Hunter/superhero.html?character=${data[i].id}" class="character-link">
        <div class="char-details">
            <img src="${data[i].thumbnail.path}.jpg" alt="" class="char-thumbnail" height="30" width="30">
            <p class="charName" id="charName1">
            ${data[i].name}
            </p>
            </div>
    </a>
    <button class="addFav" name="${data[i].name}" id="${data[i].id}">
    <i class="fa-solid fa-plus addFavi"></i>
    </button>`;

        // append the search item
        searchBucket.append(li);
    }
    //fetching DOM elements from html document 
    const favoriteBtn = document.querySelectorAll('.addFav');

    // pushing character data in localstorage when clicked on add button
    favoriteBtn.forEach((ele) => {
        ele.addEventListener('click', () => {
            const charName = ele.getAttribute('name');
            const charId = ele.getAttribute('id');

            localStorage.setItem(charName, charId);
        })
    })

}

// Handling input search results
searchInput.addEventListener('keyup', (e) => {
    let userData = e.target.value;
    if (userData != '') {
        while (searchBucket.hasChildNodes()) {
            searchBucket.firstChild.remove();
        }
        let search_url = `${base_url}/characters?nameStartsWith=${userData}&ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=${hash}&limit=100`;
        fetchSearchResults(search_url);
    }
    if (userData.length == 0) {
        searchList.style.display = "none";
    } else {
        searchList.style.display = "block";
    }

})

// Clearing previous Search results before showing the exact
function clearSearchResults() {
    while (searchBucket.hasChildNodes()) {
        searchBucket.firstChild.remove();
    }
}

// handling search result on clicking search button
searchBtn.addEventListener('click', (e) => {
    let inputValue = searchInput.value;
    const url = `${base_url}/characters?name=${inputValue}&ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=${hash}&limit=10`;
    clearSearchResults();  // Clear previous search results
    fetchSearchResults(url);
})

// fetching search result 
async function fetchSearchResults(url) {
    const response = await fetch(url);
    const data = await response.json();
    renderSearchList(data.data.results);
}