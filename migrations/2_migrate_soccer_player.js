var IPFSInbox = artifacts.require("../contracts/SoccerPlayers.sol");

module.exports = function(deployer) {
    deployer.deploy(IPFSInbox);
};
