const fs = require('fs');
const yargs = require('yargs');
const {getCharacterDatabase} = require('./lib/api_hepers');
const {findCharacters} = require('./lib/character_helpers');

yargs.command({
  command: 'find',
  describe: 'Find a character',
  builder: {
    id: {
      describe: 'id of character',
      demandOption: false,
      type: 'number',
      alias: 'id',
    },
    name: {
      describe: 'name of character',
      demandOption: false,
      type: 'string',
      alias: 'n',
    },
    status: {
      describe: 'status of character',
      demandOption: false,
      type: 'string',
      alias: 'st',
    },
    species: {
      describe: 'species of character',
      demandOption: false,
      type: 'string',
      alias: 'sp',
    },
    type: {
      describe: 'type of character',
      demandOption: false,
      type: 'string',
      alias: 't',
    },
    gender: {
      describe: 'gender of character',
      demandOption: false,
      type: 'string',
      alias: 'g',
    },
    location: {
      describe: 'location of character',
      demandOption: false,
      type: 'string',
      alias: 'l',
    },
  },
  async handler(argv) {
    const arrayOfCharacters = await getCharacterDatabase();
    const arrayOfAcceptableArgs = ['gender', 'name', 'location', 'type', 'species', 'status'];
    const searchParams = Object.entries(argv).filter((argument) => arrayOfAcceptableArgs.includes(argument[0]));
    const arrayOfMatchingCharacters = findCharacters(arrayOfCharacters, searchParams);
    return fs.writeFileSync('results.json', JSON.stringify(arrayOfMatchingCharacters, null, '\t'), 'utf8');
  },
})
    .demandCommand(1, 'You need to pass a command');

yargs.parse();
