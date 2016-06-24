import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer as yaFormReducer } from 'ya-react-redux-form';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();

const configureStore = (initialState = {}, client) => {
  const rootReducer = combineReducers({
    apollo: client.reducer(),
    yaForm: yaFormReducer,
  });

  return createStore(rootReducer, initialState, compose(
       applyMiddleware(thunk, logger),
       window.devToolsExtension ? window.devToolsExtension() : f => f
   ));
};

export default configureStore;
