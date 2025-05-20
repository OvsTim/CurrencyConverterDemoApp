import {useState} from 'react';
import data from '../../assets/currencies.json';
import {Currency} from '../../types/Currency.ts';

const useCurrencySelectController = () => {
  const fullList = data;
  const [currencies, setCurrencies] = useState<Currency[]>(fullList);
  const [search, setSearch] = useState('');

  const onSearchChange = (term: string) => {
    if (!term) setCurrencies(fullList);
    else {
      setCurrencies(
        fullList.filter(
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
