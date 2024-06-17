var deployApplications = artifacts.require("Applications")
module.exports = function(deployer){
    deployer.deploy(deployApplications)
}