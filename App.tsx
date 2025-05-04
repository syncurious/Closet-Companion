import {Provider} from 'react-redux';
import Navigation from './src/config/navigation';
import store from './src/config/redux';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <Toast />
    </Provider>
  );
};

export default App;
