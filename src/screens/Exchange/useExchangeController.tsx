import {useEffect, useMemo, useState} from 'react';
import {useCurrenciesStore} from '../../store/CurrenciesStore.tsx';

const useExchangeController = () => {
  const {
    to,
    from,
    swapCurrencies,
    lastCachedResponse,
    setLatestCachedResponse,
  } = useCurrenciesStore();
  const [amount, setAmount] = useState('');

  const digitalAmount = useMemo(() => {
    if (!amount) return 1;
    else {
      try {
        return parseFloat(amount);
      } catch (e) {
        console.log(e);
        return 1;
      }
    }
  }, [amount]);
  useEffect(() => {
    fetch(
      `https://api.fxratesapi.com/latest?base=${from.code}&resolution=1m&amount=1&places=2&format=json`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        setLatestCachedResponse(json);
      })
      .catch(error => {
        console.error(error);
      });
  }, [from]);

  return {
    to,
    from,
    lastCachedResponse,
    swapCurrencies,
    digitalAmount,
    amount,
    setAmount,
  };
};

export default useExchangeController;
