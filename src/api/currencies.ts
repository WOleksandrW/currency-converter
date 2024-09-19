import { AxiosInstance } from 'axios';
import { CurrenciesObjType, CurrencyCourseType } from '../types/CurrenciesTypes';

export default function (instance: AxiosInstance) {
  return {
    getAllcurrencies() {
      return instance.get<CurrenciesObjType>('currencies.min.json');
    },
    getCurrencyCourse(currency: string) {
      return instance.get<CurrencyCourseType>(`currencies/${currency}.min.json`);
    }
  };
}
