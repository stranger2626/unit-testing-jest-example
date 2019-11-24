/**
 *
 *
 * @param {Object} characterObject character object to check
 * @param {Array<Array<String>>} searchParamsArray array of parameters to match
 * @return {Boolean} returns true if character matches all the provided params
 */
function isCharacterMatchingSearchParams(characterObject, searchParamsArray) {
  let matchesParams= true;
  searchParamsArray.forEach((parameter) => {
    const parameterName = parameter[0];
    const parameterValue = parameter[1];
    if (parameterName === 'name') {
      matchesParams = matchesParams ? characterObject[parameterName].includes(parameterValue) : false;
    } else {
      matchesParams = matchesParams ? (characterObject[parameterName] === parameterValue) : false;
    }
  });
  return matchesParams;
};

/**
 *
 *
 * @param {Array<Object>} arrayOfCharacters array of objects to search in
 * @param {Array<Array<String>>} arrayOfParams array of parameters to match
 * @return {Array<Object>} array of character objects that match search params
 */
function findCharacters(arrayOfCharacters, arrayOfParams) {
  const arrayOfMatchingCharacters = arrayOfCharacters.filter((character) => {
    return isCharacterMatchingSearchParams(character, arrayOfParams);
  });
  if (arrayOfMatchingCharacters.length === 0) {
    throw new Error(`No characters matching [${arrayOfParams}] params found!`);
  } else {
    return arrayOfMatchingCharacters;
  }
};

module.exports = {
  findCharacters,
};
