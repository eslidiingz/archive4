import { Contract, ethers, providers } from "ethers";
import Config, { debug } from "../configs/config";
import { dAppChecked, smartContact, web3Provider } from "./providers/connector";
import dayjs from "dayjs";

/** Function without provider */
export const shortWallet = (_wallet) => {
  return _wallet ? `${_wallet.substring(0, 6)}...${_wallet.slice(-4)}` : null;
};

export const numberComma = (number) => {
  try {
    number = number.toString().replace(/,/g, "");
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch {
    return number;
  }
};

export const numberFormat = (number) => {
  try {
    if (number == "") {
      number = 0;
    }
    number = parseFloat(number);
    return numberComma(number.toFixed(2));
  } catch {
    return number;
  }
};

export const unlimitAmount =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

/** Function is require provider */
export const checkTransaction = async (txnHash) => {
  /** Check dAdpp connected */
  if (await dAppChecked()) {
    // const provider = new providers.JsonRpcProvider(
    //   "https://data-seed-prebsc-2-s2.binance.org:8545/"
    // );
    const provider = web3Provider();
    const txn = await provider.getTransactionReceipt(txnHash);
    return txn;
  } /** End Check dApp */
};

export const objectForParams = (object) => {
  let params = {};

  Object.keys(object).forEach((key) => {
    if (object[key] !== "") {
      params[key] = object[key];
    }
  });

  console.log(params);

  let json = JSON.stringify(params);

  json.replace(/\\"/g, "\uFFFF"); // U+ FFFF
  json = json.replace(/"([^"]+)":/g, "$1:").replace(/\uFFFF/g, '\\"');

  return json;
};

export const objectForParamsNotKey = (object) => {
  let json = JSON.stringify(object);
  json.replace(/\\"/g, "\uFFFF"); // U+ FFFF
  json = json.replace(/"([^"]+)":/g, "$1:").replace(/\uFFFF/g, '\\"');
  return json;
};

export const generateProjectCheckboxTree = async (projects = []) => {
  try {
    const nodes = [];
    const mappedProject = {};

    if (Array.isArray(projects) && projects.length) {

      projects.map((project) => {
        const tempNode = mappedProject[project.project_id] ? { ...mappedProject[project.project_id] } : { projectId: project.project_id, projectName: project.project_name, zones: {} };

        tempNode.zones[project.zone_id] = {
          zoneId: project.zone_id,
          zoneName: project.zone_name
        };

        mappedProject[project.project_id] = { ...tempNode };
      });

      for (let key in mappedProject) {
        if (mappedProject.hasOwnProperty(key)) {
          const tempNode = {
            value: mappedProject[key].projectId,
            label: mappedProject[key].projectName,
            children: []
          };

          for (let zonekey in mappedProject[key].zones) {
            if (mappedProject[key].zones.hasOwnProperty(zonekey)) {
              tempNode.children.push({ value: JSON.stringify({
                projectId: mappedProject[key].projectId, zoneId: mappedProject[key].zones[zonekey].zoneId
              }), label: mappedProject[key].zones[zonekey].zoneName });
            }
          }

          nodes.push(tempNode);
        }
      }

    }

    return nodes;
  } catch {
    return [];
  }
};

export const convertDateToTimestampSecond = (date) => {
  try{
    return new Date(date).getTime();
  }catch{
    return null;
  }
};
