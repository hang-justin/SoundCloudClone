// const chai = require('chai');
// let chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// const expect = chai.expect;
const fetch = require('node-fetch');

const baseUrl = process.env.BASE_URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

async function login(loginPath) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  };
  const res = await fetch(baseUrl.concat(loginPath), options);
  return res.json();
}

module.exports = {login};