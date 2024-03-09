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
// apiService/foodItem


export const fetchFoodItems = async () => {
  try {
    const response = await fetch(`${baseURL}/foodItems`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching foodItems:", error);
    throw error; // Re-throwing the error is important for the caller to handle it
  }
};

// Add a foodItem
export const addFoodItem = async (foodItem) => {
    const response = await fetch(`${baseURL}/foodItems`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodItem),
    });
    if (!response.ok) {
      throw new Error('Failed to add foodItem');
    }
    console.log(JSON.stringify(foodItem));
    return response.json();
  };
  
  // Update a foodItem
  export const updateFoodItem = async (id, foodItem) => {
    const response = await fetch(`${baseURL}/foodItems/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(foodItem),
    });
    if (!response.ok) {
      throw new Error('Failed to update foodItem');
    }
    return response.json();
  };
  
  // Delete a foodItem
  export const deleteFoodItem = async (id) => {
    const response = await fetch(`${baseURL}/foodItems/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete foodItem');
    }
    return true;
  };