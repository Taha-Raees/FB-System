// apiService
const baseURL = 'https://fb-be.onrender.com';

export const fetchfoodtrucks = async () => {
  try {
    const response = await fetch(`${baseURL}/foodtrucks`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching foodtrucks:", error);
    throw error; // Re-throwing the error is important for the caller to handle it
  }
};

// Add a foodtruck
export const addfoodtruck = async (foodtruck) => {
    const response = await fetch(`${baseURL}/foodtrucks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodtruck),
    });
    if (!response.ok) {
      throw new Error('Failed to add foodtruck');
    }
    return response.json();
  };
  
  // Update a foodtruck
  export const updatefoodtruck = async (id, foodtruck) => {
    const response = await fetch(`${baseURL}/foodtrucks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodtruck),
    });
    if (!response.ok) {
      throw new Error('Failed to update foodtruck');
    }
    return response.json();
  };
  
  // Delete a foodtruck
  export const deletefoodtruck = async (id) => {
    const response = await fetch(`${baseURL}/foodtrucks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete foodtruck');
    }
    return true;
  };