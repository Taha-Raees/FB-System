// clock.js
import { updateClock } from '@/app/apiService';

const clockId = 1; // Adjust based on your clock record's ID

export function scheduleClockUpdate() {
  const update = () => {
    const timestamp = new Date().toISOString(); // ISO 8601 format string
    console.log('Updating clock with timestamp:', timestamp);

    updateClock(clockId, timestamp)
      .then(data => console.log('Clock updated successfully:', data))
      .catch(error => console.error('Error updating clock:', error));
  };

  update(); // Update immediately
  setInterval(update, 30*1000); // Schedule subsequent updates every second
}
