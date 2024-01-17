import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Corrected import
import App from '@/Components/app';
import rootReducer from '@/reducers';
import './Events.scss';
const store = createStore(rootReducer, applyMiddleware(thunk));
const Events = () => {
 

  return (
   <div className="events">
     <Provider store={store}>
    <App />
  </Provider>
   </div>
  );
};

export default Events;

