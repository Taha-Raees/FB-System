import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Corrected import
import App from '@/Components/app';
import rootReducer from '@/reducers';




// Create Redux store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

const CreateEvent = () => {

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default CreateEvent;



