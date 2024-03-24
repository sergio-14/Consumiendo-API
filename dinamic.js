function getCharacters(done) {
    fetch("https://rickandmortyapi.com/api/character")
        .then(response => response.json())
        .then(data => {
            done(data);
        })
        .catch(error => {
            console.error('Error fetching characters:', error);
        });
}

getCharacters(data => {
    const div = document.querySelector("div");
    const totalCharacters = data.results.length;
    const randomIndexes = new Set();

    // Generar 6 números aleatorios únicos entre 0 y la longitud del array de personajes
    while (randomIndexes.size < 20) {
        randomIndexes.add(Math.floor(Math.random() * totalCharacters));
    }

    // Seleccionar personajes aleatorios usando los índices generados
    const randomCharacters = Array.from(randomIndexes).map(index => data.results[index]);

    const article = document.createElement('article');
    article.className = "slide";
    article.innerHTML = randomCharacters.map(character => `
        <div class="item main" style="background-image: url(${character.image});">
            <div class="content">
                <div class="name">${character.name}</div>
                <div class="des">Estado: ${character.status} - ${character.species}</div>
                <div class="des">Caracteristica: ${character.type}</div>
            </div>
        </div>
    `).join('');

    div.appendChild(article);
});

document.addEventListener("DOMContentLoaded", function () {
    let next = document.querySelector('.next');
    let prev = document.querySelector('.prev');

    next.addEventListener('click', function () {
        let slide = document.querySelector('.slide');
        let firstItem = slide.firstElementChild;
        slide.appendChild(firstItem);
    });

    prev.addEventListener('click', function () {
        let slide = document.querySelector('.slide');
        let lastItem = slide.lastElementChild;
        slide.prepend(lastItem);
    });
});

