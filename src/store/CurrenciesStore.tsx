import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';
import data from '../assets/currencies.json';
import {Currency} from '../types/Currency.ts';
class CurrenciesStore {
  from: Currency;
  to: Currency;
  lastCachedResponse: any;

  constructor() {
    this.from = data.filter((it: Currency) => it.code === 'USD')[0];
    this.to = data.filter((it: Currency) => it.code === 'EUR')[0];
    makeAutoObservable(this);
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
}

const currenciesStore = new CurrenciesStore();
export const CurrenciesStoreContext = createContext(currenciesStore);
export const useCurrenciesStore = () => useContext(CurrenciesStoreContext);
