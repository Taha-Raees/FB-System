
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const Keymaster = dynamic(() => import('keymaster'), {
  ssr: false
});

export default function KeymasterComponent() {

  useEffect(() => {
    Keymaster('ctrl+s', () => {
      console.log('Keyboard shortcut triggered');
    });
  }, []);

  return null;
}



