function isCharacterMatchingSearchParams(characterObject, searchParamsArray) {
    let matchesParams= true;
    searchParamsArray.forEach(parameter => {
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

function findCharacters(arrayOfCharacters, arrayOfParams) {
    const arrayOfMatchingCharacters = arrayOfCharacters.filter(character => isCharacterMatchingSearchParams(character, arrayOfParams));
    if (arrayOfMatchingCharacters.length === 0) {
        throw new Error(`No characters matching [${arrayOfParams}] params found!`);
    } else {
        return arrayOfMatchingCharacters;
    }
};

module.exports = {
    findCharacters,
};