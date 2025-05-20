import {useState} from 'react';
import {useCurrenciesStore} from '../../store/CurrenciesStore.tsx';
import {Currency} from '../../types/Currency.ts';

const useCurrencySelectController = () => {
  const {currencyList} = useCurrenciesStore();
  const [currencies, setCurrencies] = useState<Currency[]>(currencyList);
  const [search, setSearch] = useState('');

  const onSearchChange = (term: string) => {
    if (!term) setCurrencies(currencyList);
    else {
      setCurrencies(
        currencyList.filter(
          it =>
            it.name.toLowerCase().includes(term.toLowerCase().trim()) ||
            it.code.toLowerCase().includes(term.toLowerCase().trim()),
        ),
      );
    }
  };

  return {
    currencies,
    search,
    setSearch,
    onSearchChange,
  };
};

export default useCurrencySelectController;
