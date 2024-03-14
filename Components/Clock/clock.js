import { updateClock } from './apiService';

const clockId = 1; // Adjust based on your clock record's ID

function scheduleClockUpdate() {
  const update = () => {
    const timestamp = new Date().toISOString(); // ISO 8601 format string

    updateClock(clockId, timestamp)
      .then(data => console.log('Clock updated successfully:', data))
      .catch(error => console.error('Error updating clock:', error));
  };

  update(); // Update immediately
  setInterval(update, 60 * 1000); // Schedule subsequent updates every 60 seconds
}

scheduleClockUpdate();
