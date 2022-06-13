import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {store} from './redux/store'
import {Provider} from "react-redux";

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <Provider store={store}>
      {/*<React.StrictMode>*/}
      <BrowserRouter>
        <App/>
      </BrowserRouter>
      {/*</React.StrictMode>*/}
    </Provider>
  );
}

reportWebVitals();