import web3 from 'public-modules/Utilities/Web3Client';
import config from 'public-modules/config';
import {
  networkSelector,
  addressSelector,
  walletLockedSelector,
  hasWalletSelector
} from 'public-modules/Client/selectors';
import { call, put, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { promisify } from 'public-modules/Utilities/helpers';
import { actions } from 'public-modules/Client';

const { setHasWallet, setNetwork, setLocked, setAddress } = actions;

function* getWalletAddress() {
  const accounts = yield promisify(web3.eth.getAccounts);
  return accounts[0];
}

function* isWalletLocked() {
  const accounts = yield promisify(web3.eth.getAccounts);
  return accounts.length === 0;
}

export function* getNetwork() {
  const networkID = yield promisify(web3.eth.net.getId);

  let network = 'unknown';
  if (networkID === 1) {
    network = 'mainnet';
  }
  if (networkID === 4) {
    network = 'rinkeby';
  }

  return network;
}

export function* getWeb3Client() {
  let currentAddress = '';
  let isLocked = false;
  let currentNetwork = 'unknown';
  const wasLocked = yield select(walletLockedSelector);
  const prevAddress = yield select(addressSelector);
  const hadWallet = yield select(hasWalletSelector);
  const hasWallet =
    typeof window.web3 !== 'undefined' &&
    typeof window.web3.currentProvider !== 'undefined';
  const networkPrev = yield select(networkSelector);
  if (hasWallet !== hadWallet) {
    yield put(setHasWallet(hasWallet));
  }
  if (hasWallet) {
    web3.setProvider(window.web3.currentProvider);
    isLocked = yield call(isWalletLocked);
  }
  if (!isLocked) {
    currentNetwork = yield call(getNetwork);
    currentAddress = yield call(getWalletAddress);
  }
  if (isLocked !== wasLocked) {
    yield put(setLocked(isLocked));
  }
  if (currentAddress !== prevAddress) {
    yield put(setAddress(currentAddress));
  }

  if (currentNetwork !== networkPrev) {
    yield put(setNetwork(currentNetwork));
  }
}

export function* getContractClients() {
  const web3 = yield call(getWeb3Client);
  const network = yield select(networkSelector);

  if (network !== 'unknown') {
    return {
      standardBounties: web3.eth
        .contract(config.interfaces.StandardBounties)
        .at(config[network].standardBountiesAddress)
    };
  }
  return null;
}

export function* checkNetwork() {
  // every second and a half, network and wallet status is updated in the redux store
  while (true) {
    yield call(getWeb3Client);
    yield delay(1000);
  }
}

export default [checkNetwork];
