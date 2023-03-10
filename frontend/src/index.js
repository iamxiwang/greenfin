import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from "./context/Modal";
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import * as listingActions from './store/listings';
import {createRoot} from 'react-dom/client';



const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.listingActions =listingActions
}

const root = createRoot(document.getElementById("root"));

const renderApplication = () => {
  return root.render(
    // <React.StrictMode>
        <ModalProvider>
          <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Provider>
    </ModalProvider>
    // </React.StrictMode>,
  );
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}

// function Root() {
//   return (
//     <ModalProvider>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//     </ModalProvider>
//   );
// }


// ReactDOM.render(
//   <React.StrictMode>
//     <ModalProvider>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//     </ModalProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );




