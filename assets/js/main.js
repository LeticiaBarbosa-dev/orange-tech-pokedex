const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 12;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons
      .map(
        (pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types
                          .map(
                            (type) => `<li class="type ${type}">${type}</li>`
                          )
                          .join("")}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `
      )
      .join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordWithNextPage = offset + limit;

  if (qtdRecordWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});

// Dark Mode
const body = document.querySelector('body');
const content = body.querySelector(".content");
const checkbox = document.querySelector('input[name="theme"]');

const getStyle = (element, style) => window.getComputedStyle(element).getPropertyValue(style);


const initialColors = {
  bgBody: getStyle(body, "--bg-body"),
  bgContent: getStyle(body, "--bg-content"),
  colorText: getStyle(body, "--color-text"),
}

const darkMode = {
  bgBody: "#333333",
  bgContent: "#434343",
  colorText: "#B5B5B5"
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map(key => 
    body.style.setProperty(transformKey(key), colors[key])
  )
}

checkbox.addEventListener("change", ({target}) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors);
})