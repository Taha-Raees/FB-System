import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Calendar component with SSR disabled
const DynamicCalendar = dynamic(
  () => import('@/Components/calender'), // Adjust the import path as needed
  { ssr: false }
);

class App extends React.Component {
  render() {
    return (
      <div>
        <DynamicCalendar />
      </div>
    );
  }
}

export default App;
