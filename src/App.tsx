import { Provider } from 'react-redux';
import { setupStore } from './redux/store';
import { MainLayout } from './layouts';

function App() {
  return (
    <Provider store={setupStore()}>
      <MainLayout />
    </Provider>
  );
}

export default App;
