var deployPatents = artifacts.require("Patents")
module.exports = function(deployer){
    deployer.deploy(deployPatents)
}