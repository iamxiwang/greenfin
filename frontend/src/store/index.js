import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import listingsReducer from "./listings";
import sessionReducer from "./session";
import commentsReducer from'./comment'
import appointmentsReducer from "./appointment";
import likesReducer from "./like";



const rootReducer = combineReducers({
    session: sessionReducer,
    listings: listingsReducer,
    comments: commentsReducer,
    appointments: appointmentsReducer,
    likes: likesReducer

});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore