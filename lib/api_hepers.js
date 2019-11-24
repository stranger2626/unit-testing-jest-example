const axios = require('axios');

/**
 *
 *
 * @param {Number} pageNumber index of page to retrieve from DB
 * @return {Array<Object>} returns and array of character objects from a specified page
 */
async function getDatabasePage(pageNumber) {
  const resultsPage = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`);
  return resultsPage.data;
};

/**
 *
 *
 * @return {Array<Object>} returns and array of character objects
 */
async function getCharacterDatabase() {
  const firstPage = await getDatabasePage(1);
  const firstPageResults = firstPage.results;
  const numberOfPages = firstPage.info.pages;
  let arrayOfCharacters = [...firstPageResults];
  const arrayOfPromises = [];
  for (let i = 2; i <= numberOfPages; i++) {
    arrayOfPromises.push(getDatabasePage(i));
  };
  const arrayOfPages = await Promise.all(arrayOfPromises);
  arrayOfPages.forEach((page) => {
    return page.results.forEach((character) => arrayOfCharacters = arrayOfCharacters.concat(character));
  });
  return arrayOfCharacters;
};

module.exports = {
  getCharacterDatabase,
};
