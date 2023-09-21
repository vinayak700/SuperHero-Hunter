// Capturing the id of the character through the url
const id = new URLSearchParams(window.location.search).get('character');

// Generating an url
const public_key = '9ab871748d83ae2eb5527ffd69e034de';
const hash = 'd35377547e551cd64a60657d2517bb7f';
const url = `https://gateway.marvel.com/v1/public/characters/${id}?&ts=1&apikey=${public_key}&hash=${hash}`;

// Making an api call to get an individual character
async function getChar(url) {
    const res = await fetch(url);
    const data = await res.json();
    (data.data.results);
    renderChar(data.data.results);
}
getChar(url);

// // Rendering an individual character
function renderChar(data) {
    // Retrieve the DOM element with the id 'charName'
    const name = document.getElementById('charName');

    // Render the title of character
    name.innerHTML = data[0].name;

    // Rendering an image
    const img = document.getElementById('img');
    img.setAttribute('src', `${data[0].thumbnail.path}.jpg`);

    // Render Comics list
    const comics = document.getElementById('comics01');
    for (let i = 0; i < data[0].comics.items.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${data[0].comics.items[i].name}`;
        // Append comics list to comics
        comics.append(li);
    }

    // Render Events list
    const events = document.getElementById('events01');
    for (let i = 0; i < data[0].events.items.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${data[0].events.items[i].name}`;
        // append events list to events
        events.append(li);
    }

    // Render series list
    const series = document.getElementById('series01');
    for (let i = 0; i < data[0].series.items.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${data[0].series.items[i].name}`;
        // append series list to series
        series.append(li);
    }

    // Render stories list
    const stories = document.getElementById('stories01');
    for (let i = 0; i < data[0].stories.items.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${data[0].stories.items[i].name}`;
        // append stories list into stories
        stories.append(li);
    }
}