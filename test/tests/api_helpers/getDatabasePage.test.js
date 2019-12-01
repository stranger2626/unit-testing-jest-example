const {expect} = require('chai');
const path = require('path');
const fs = require('fs');
const nock = require('nock');
const {getDatabasePage} = require('../../../lib/api_helpers');
const firstPageFilePath = path.resolve('./test/test_data/character_database/first_page.json');
const firstPageData = JSON.parse(fs.readFileSync(firstPageFilePath));

test('getDatabasePage', async () => {
  nock('https://rickandmortyapi.com/')
      .get('/api/character/?page=1')
      .reply(200, firstPageData);
  const firstPage = await getDatabasePage(1);
  expect(firstPage.info.pages).to.be.equal(25);
});
