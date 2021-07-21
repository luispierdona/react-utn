import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './topbar/header';
import { ToastProvider } from 'react-toast-notifications';
import LibrosView from './libros/libros-view';
import CategoriasView from './categorias/categorias-view';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(

  <Provider store={store}>
    {/* <App /> */}
    <Router>
      <Header />
      <Switch>
        <ToastProvider>
          <Route exact path='/' component={LibrosView}></Route>
          <Route exact path='/categorias' component={CategoriasView}></Route>
          <Route exact path='/personas' component={App}></Route>
        </ToastProvider>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// <React.StrictMode> DELETED
// Porque el modal de bootstrap aun utiliza la funcion findDOMNode
// que pronto se va a deprecar en bootstrap
reportWebVitals();
