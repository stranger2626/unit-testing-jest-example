const axios = require('axios');

async function getDatabasePage(pageNumber) {
    const resultsPage = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`);
    return resultsPage.data;
};

async function getCharacterDatabase() {
    const firstPage  = await getDatabasePage(1);
    const firstPageResults = firstPage.results;
    const numberOfPages = firstPage.info.pages;
    let arrayOfCharacters = [...firstPageResults];
    let arrayOfPromises = [];
    for (let i = 2; i <= numberOfPages; i++) {
        arrayOfPromises.push(getDatabasePage(i));
    };
    const arrayOfPages = await Promise.all(arrayOfPromises);
    arrayOfPages.forEach(page => {
        return page.results.forEach(character => arrayOfCharacters = arrayOfCharacters.concat(character));
    });
    return arrayOfCharacters;
};

module.exports = {
    getCharacterDatabase,
};