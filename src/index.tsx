import React from 'react';
import ReactDOM from 'react-dom';
import 'App.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AppProviders } from 'context';
import { Provider } from 'react-redux';
import store from "./store";
import { fetchCategory } from 'store/feature/categorySlice';


store.dispatch(fetchCategory())

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppProviders>
      <App />
    </AppProviders>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
