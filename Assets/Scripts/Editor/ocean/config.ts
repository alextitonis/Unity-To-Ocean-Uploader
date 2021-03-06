import Web3 from "web3";
import * as fs from "fs";
import { homedir } from "os";
import {
  ConfigHelper,
  configHelperNetworks,
  LoggerInstance,
  LogLevel,
} from "@oceanprotocol/lib";

LoggerInstance.setLevel(LogLevel.Error);
export const GAS_PRICE = "3000000000";
export const web3 = new Web3(
  (process.env.NODE_URI as any) || (configHelperNetworks[1].nodeUri as any)
);
export const getTestConfig = async (web3: any) => {
  const config = new ConfigHelper().getConfig(await web3.eth.getChainId());
  config.providerUri = process.env.PROVIDER_URL || config.providerUri;
  return config;
};

export const getAddresses = () => {
  const data = JSON.parse(
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.readFileSync(
      process.env.ADDRESS_FILE ||
        `${homedir}/.ocean/ocean-contracts/artifacts/address.json`,
      "utf8"
    )
  );
  return data.development;
};
