// apiService
const baseURL = 'https://fb-be.onrender.com';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${baseURL}/foodtrucks`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throwing the error is important for the caller to handle it
  }
};

// Add a product
export const addProduct = async (product) => {
    const response = await fetch(`${baseURL}/foodtrucks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    return response.json();
  };
  
  // Update a product
  export const updateProduct = async (id, product) => {
    const response = await fetch(`${baseURL}/foodtrucks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  };
  
  // Delete a product
  export const deleteProduct = async (id) => {
    const response = await fetch(`${baseURL}/foodtrucks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
    return true;
  };


// apiService/equipment

export const fetchequipments = async () => {
  try {
    const response = await fetch(`${baseURL}/inventorys`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching equipment:", error);
    throw error; // Re-throwing the error is important for the caller to handle it
  }
};

// Add a equipment
export const addequipment = async (equipment) => {
    const response = await fetch(`${baseURL}/inventorys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equipment),
    });
    if (!response.ok) {
      throw new Error('Failed to add equipment');
    }
    console.log(JSON.stringify(equipment));
    return response.json();
  };
  
  // Update a equipment
  export const updateequipment = async (id, equipment) => {
    const response = await fetch(`${baseURL}/inventorys/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(equipment),
    });
    if (!response.ok) {
      throw new Error('Failed to update equipment');
    }
    return response.json();
  };
  
  // Delete a equipment
  export const deleteequipment = async (id) => {
    const response = await fetch(`${baseURL}/inventorys/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete equipment');
    }
    return true;
  };
  // Function to update the clock
  export const updateClock = async (clockId, timestamp) => {
    try {
      console.log('Sending update to server:', { clockId, timestamp });
      const response = await fetch(`${baseURL}/clock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clockId, timestamp }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update clock');
      }
  
      const jsonResponse = await response.json();
      console.log('Server response:', jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error("Error updating clock:", error);
      throw error;
    }
  };
  // Create a user
export const createUser = async (userData) => {
  const response = await fetch(`${baseURL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
};

// Read all users
export const fetchUsers = async () => {
  const response = await fetch(`${baseURL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

// Read a specific user by ID
export const fetchUserById = async (id) => {
  const response = await fetch(`${baseURL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

// Update a user
export const updateUser = async (id, userData) => {
  const response = await fetch(`${baseURL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
};

// Delete a user
export const deleteUser = async (id) => {
  const response = await fetch(`${baseURL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  // No content to return, so just confirm deletion was successful
  return true;
};

