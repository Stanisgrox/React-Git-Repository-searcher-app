import ReactDOM from 'react-dom/client';
import './index.sass';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
/*
  INDEX.TSX
  Тут установлен store и provider
*/

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
