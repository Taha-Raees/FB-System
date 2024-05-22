const baseURL = 'https://fb-be.onrender.com';

// Fetch all events
export const fetchEvents = async () => {
  try {
    const response = await fetch(`${baseURL}/events`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Add an event
export const addEvent = async (eventData) => {
  const response = await fetch(`${baseURL}/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw new Error('Failed to add event');
  }
  return response.json();
};

// Update an event
export const updateEvent = async (id, eventData) => {
  const response = await fetch(`${baseURL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    throw new Error('Failed to update event');
  }
  return response.json();
};

// Delete an event
export const deleteEvent = async (id) => {
  const response = await fetch(`${baseURL}/events/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete event');
  }
  return true;
};

// Fetch all POS systems for an event
export const fetchPosSystems = async (eventId) => {
  try {
    const response = await fetch(`${baseURL}/event/${eventId}/posSystems`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching POS systems:", error);
    throw error;
  }
};