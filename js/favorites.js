const favCharBucket = document.getElementById('fav-chars');
const noFavChar = document.getElementById('noFavChar');
const hash = 'd35377547e551cd64a60657d2517bb7f';

// looping over all the elements found in local storage
if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
        // Accessing key in local storage
        const key = localStorage.key(i);
        // Getting corresponding value from the key
        const value = localStorage.getItem(key);
        const url = `http://gateway.marvel.com/v1/public/characters/${value}?&ts=1&apikey=9ab871748d83ae2eb5527ffd69e034de&hash=${hash}`;
        fetchFavChar(url);
    }
} else {
    noFavChar.style.display = 'block';
}

// Calling an api to fetch characters with an id stored in local storage
async function fetchFavChar(url) {
    const res = await fetch(url);
    const data = await res.json();
    renderFavChar(data.data.results);
    removeChar();
}

// Rendering all favorite characters available in local storage
function renderFavChar(data) {
    const div = document.createElement('div');
    div.className = "card";
    div.style.width = "13rem";
    div.style.height = "21rem"
    div.innerHTML = `<a href="/superhero.html?character=${data[0].id}" class="character-link">
        <img src="${data[0].thumbnail.path}.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data[0].name}</h5>
            <p>Comics: <span class="comics">${data[0].comics.available}</span></p>
            <p>Series: <span class="series">${data[0].series.available}</span></p>
        </div>
        </a>
        <button class="delBtn"name="${data[0].name}"><i class="fa-solid fa-trash "></i></button>`;
    favCharBucket.append(div);
}

// Removing a specified character
function removeChar() {
    const delChar = document.querySelectorAll('.delBtn');
    delChar.forEach((ele) => {
        ele.addEventListener('click', (e) => {
            e.stopPropagation();
            localStorage.removeItem(ele.name);
            location.reload();
        })
    })
}
