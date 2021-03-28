require('dotenv').config();

const express= require('express')
const app =express()

const routes = require('./routes')

const Web3 = require('web3');
const contract = require('truffle-contract');
const artifacts = require('../build/SoccerPlayers.json');

app.use(express.json())

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

const LMS = contract(artifacts)
LMS.setProvider(web3.currentProvider)


const init = async () => {
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0]
    const lms = await LMS.deployed();
    routes(app, lms, accounts)
    app.listen(process.env.PORT || 8082, () => {
        console.log('listening on port '+ (process.env.PORT || 8082));
    })
}

init();
