import {Provider} from 'react-redux';
import Navigation from './src/config/navigation';
import store from './src/config/redux';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
