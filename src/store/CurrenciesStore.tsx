import {createContext, useContext} from 'react';
import {Alert} from 'react-native';
import {action, makeObservable, observable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import {StorageController} from 'mobx-persist-store/lib/esm2017/types';
import {MMKV} from 'react-native-mmkv';
import data from '../assets/currencies.json';
import {Currency} from '../types/Currency.ts';
import {ServerResponse} from '../types/ServerResponse.ts';

const fullList = data;
const storage = new MMKV();

const mmkvStorage: StorageController = {
  clear: () => {
    storage.clearAll();
    return Promise.resolve();
  },
  setItem: (key: string, value: any) => {
    storage.set(key, value);
    return Promise.resolve();
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

class CurrenciesStore {
  from: Currency;
  to: Currency;
  lastCachedResponse?: ServerResponse;
  currencyList: Currency[];

  constructor() {
    this.from = data.filter((it: Currency) => it.code === 'USD')[0];
    this.to = data.filter((it: Currency) => it.code === 'EUR')[0];
    this.lastCachedResponse = undefined;
    this.currencyList = data;
    makeObservable(this, {
      from: observable,
      to: observable,
      lastCachedResponse: observable,
      currencyList: observable,

      setFrom: action.bound,
      setTo: action.bound,
      swapCurrencies: action.bound,
      setLatestCachedResponse: action.bound,
      convertToNewBaseCurrency: action.bound,
    });
    makePersistable(this, {
      name: 'CurrenciesStore',
      properties: ['from', 'to', 'lastCachedResponse'],
      storage: mmkvStorage,
    });
  }

  setFrom = (curr: Currency) => {
    this.from = curr;
    if (this.to.code === curr.code) {
      if (curr.code === 'USD') {
        this.to = data.filter((it: Currency) => it.code === 'EUR')[0];
      } else {
        this.to = data.filter((it: Currency) => it.code === 'USD')[0];
      }
    }
  };

  setTo = (curr: Currency) => {
    this.to = curr;
    if (this.from.code === curr.code) {
      if (curr.code === 'USD') {
        this.from = data.filter((it: Currency) => it.code === 'EUR')[0];
      } else {
        this.from = data.filter((it: Currency) => it.code === 'USD')[0];
      }
    }
  };

  setLatestCachedResponse = (lastCachedResponse: ServerResponse) => {
    if (lastCachedResponse.success === true) {
      this.lastCachedResponse = {...lastCachedResponse};
      const currCodes = Object.keys(lastCachedResponse.rates);
      this.currencyList = [
        ...fullList.filter(it => currCodes.includes(it.code)),
      ];
    } else {
      if (lastCachedResponse.error) {
        Alert.alert(
          lastCachedResponse.error.message,
          lastCachedResponse.error.description,
        );
      }
    }
  };

  swapCurrencies = () => {
    this.convertToNewBaseCurrency(this.from.code, this.to.code);
    const curr = this.to;
    this.to = this.from;
    this.from = curr;
  };

  convertToNewBaseCurrency = (oldCurrency: string, newCurrency: string) => {
    if (!this.lastCachedResponse || !this.lastCachedResponse.rates) return;

    const currentBaseRate = this.lastCachedResponse.rates[oldCurrency];
    const newBaseRate = this.lastCachedResponse.rates[newCurrency];
    if (currentBaseRate && newBaseRate) {
      const newRates = Object.keys(this.lastCachedResponse.rates).reduce(
        (acc: {[key: string]: number}, currency: string) => {
          const rate = this.lastCachedResponse?.rates[currency];
          if (rate !== undefined) {
            acc[currency] = (rate / currentBaseRate) * newBaseRate;
          }

          return acc;
        },
        {},
      );

      this.lastCachedResponse.base = newCurrency;
      this.lastCachedResponse.rates = newRates;
    }
  };
}

const currenciesStore = new CurrenciesStore();
export const CurrenciesStoreContext = createContext(currenciesStore);
export const useCurrenciesStore = () => useContext(CurrenciesStoreContext);
