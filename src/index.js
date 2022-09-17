import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store } from './store/index'
import Home from './pages/Home';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Home />
  </Provider>
);

