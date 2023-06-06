// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)

// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
const flag = document.querySelector(".flag");
const country = document.querySelector(".country");
const capitale = document.querySelector(".capitale");
const population = document.querySelector(".population");
const result = document.querySelector(".countrieslist");
const inputRange = document.getElementById("inputRange");
const rangeValue = document.getElementById("rangeValue");
const btnSort = document.querySelectorAll(".btnSort");

const input = document.getElementById("inputSearch");
let countriesData = [];
let sortMethod = "alpha";

async function fetchCountry() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    //.then((data) => (countriesData = data.results));
    .then((data) => (countriesData = data));
  console.log(countriesData);
  countryDisplay();
}

function countryDisplay() {
  result.innerHTML = countriesData
    .filter((country) =>
      country.translations.fra.common.toLowerCase().includes(input.value)
    )
    .sort((a, b) => {
      if (sortMethod === "maxToMin") {
        return b.population - a.population;
      } else if (sortMethod === "minToMax") {
        return a.population - b.population;
      } else if (sortMethod === "alpha") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, inputRange.value)
    .map(
      (country) => `
    <ul class="countries-container">
        <img src="${country.flags.svg}" alt="${
        country.translations.fra.common
      }" class="flag" />
        <h3 class="country">${country.translations.fra.common}</h3>
        <p class="capitale">${country.capital}</p>
        <p>Population : <span class="population">${country.population.toLocaleString()}</span></p>
      </ul>`
    )
    .join("");
}
window.addEventListener("load", fetchCountry);
input.addEventListener("input", countryDisplay);
inputRange.addEventListener("input", () => {
  countryDisplay();
  rangeValue.textContent = inputRange.value;
});

btnSort.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    sortMethod = e.target.id;
    countryDisplay();
  });
});

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
