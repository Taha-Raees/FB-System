import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; // Corrected import
import App from '@/Components/app';
import rootReducer from '@/reducers';
import dynamic from 'next/dynamic';

// Dynamically import keymaster with SSR disabled
const Keymaster = dynamic(
  () => import('keymaster'),
  { ssr: false }
);

// Create Redux store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

const CreateEvent = () => {
  useEffect(() => {
    let keymasterInstance;

  const initialize = async () => {
    keymasterInstance = await Keymaster;
    // use keymasterInstance 
  }

  initialize();
    return () => {
      // Cleanup if necessary when the component unmounts
      if (keymasterInstance) {
        // Unbind keymaster bindings or perform other cleanup
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default CreateEvent;



