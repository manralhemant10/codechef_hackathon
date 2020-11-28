import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { StateProvider } from './components/Loggedin';

ReactDOM.render(
  <StateProvider>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </StateProvider>,
  document.getElementById('root')
);


