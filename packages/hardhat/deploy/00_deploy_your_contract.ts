import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "CrashGameContract" using the deployer account and
 * constructor arguments set to the deployer address and the WBTC token address.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployCrashGameContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // WBTC token address
  const wbtcAddress = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"; // Mainnet WBTC address, update for your target network

  await deploy("CrashGameContract", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer, wbtcAddress],
    log: true,
    autoMine: true,
  });

  const crashGameContract = await hre.ethers.getContract<Contract>("CrashGameContract", deployer);
  console.log("CrashGameContract deployed to:", crashGameContract.address);
};

export default deployCrashGameContract;
deployCrashGameContract.tags = ["CrashGameContract"];
