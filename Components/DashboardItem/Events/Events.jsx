import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Corrected import
import App from '@/Components/Calender/app';
import rootReducer from '@/reducers';
const store = createStore(rootReducer, applyMiddleware(thunk));
const Events = () => {
 

  return (
   <div>
     <Provider store={store}>
    <App />
  </Provider>
   </div>
  );
};

export default Events;

