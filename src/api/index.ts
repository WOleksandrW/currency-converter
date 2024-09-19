import instance from './instance';

import currenciesModule from './currencies';

export default {
  currencies: currenciesModule(instance)
};
